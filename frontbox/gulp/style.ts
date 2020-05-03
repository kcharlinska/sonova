import * as autoprefixer from 'autoprefixer'
import * as cssnano from 'cssnano'
import { dest, src } from 'gulp'
import * as concat from 'gulp-concat'
import * as gulpif from 'gulp-if'
import * as postcss from 'gulp-postcss'
import * as sass from 'gulp-sass'
import * as sassGlob from 'gulp-sass-glob'
import * as uncss from 'uncss'
import * as sourcemaps from 'gulp-sourcemaps'
import { Gulpclass, Task } from 'gulpclass/Decorators'
import { configStyle } from '../../config/gulpfile'
import { browserSync } from '../../gulpfile'
import {
	AbstractFrontboxGulpTask,
	getMode,
	websiteDestinationPath,
} from './frontbox'
import { IFrontboxConfig, IFrontboxTask } from './interface'
import { uncssIgnore, uncssIgnoreSheets } from '../../config/uncss'

const argv = require('yargs').argv

@Gulpclass()
export class FrontboxGulpStyle extends AbstractFrontboxGulpTask {
	constructor(params?: IFrontboxTask) {
		super(configStyle, params)
	}

	task(element: IFrontboxConfig) {
		return new Promise((resolve) => {
			src(`${element.files}`, {
				allowEmpty: true,
			})
				.pipe(gulpif(!argv.prod, sourcemaps.init({ loadMaps: true })))
				.pipe(sassGlob())
				.pipe(sass())
				.pipe(
					gulpif(
						!argv.prod,
						sourcemaps.write(`./`, { sourceRoot: './' })
					)
				)
				.pipe(dest(`${this.destinationPath}/${element.dest}`))
				.on('end', () => {
					resolve()
				})
				.pipe(browserSync.reload({ stream: true }))
		})
	}

	taskProd(element: IFrontboxConfig) {
		return new Promise((resolve) => {
			src(`${element.files}`, {
				allowEmpty: true,
			})
				.pipe(
					postcss([
						autoprefixer(),
						cssnano({
							preset: [
								'default',
								{
									discardComments: {
										removeAll: true,
									},
								},
							],
						}),
						uncss.postcssPlugin({
							html: [`${websiteDestinationPath}/*.html`],
							ignore: uncssIgnore,
							ignoreSheets: uncssIgnoreSheets,
							strictSSL: false,
							htmlroot: websiteDestinationPath,
						}),
					])
				)
				.pipe(dest(`${this.destinationPath}/${element.dest}`))
				.on('end', () => {
					resolve()
				})
				.pipe(browserSync.reload({ stream: true }))
		})
	}

	async concatFiles() {
		const configTasksWithoutConcat = this.configTask.filter(
			(v) => !v.concatWith
		)

		await this.asyncForEach(
			configTasksWithoutConcat,
			async (mainConfigStyle) => {
				this.concatTasks[mainConfigStyle.name] = () => {
					const filesToConcat = this.configTask.filter(
						(v) =>
							v.concatWith === mainConfigStyle.name ||
							v.name === mainConfigStyle.name
					)
					let pathFilesToConcat = filesToConcat.map(
						(concatConfigStyle) => {
							return (
								[
									this.destinationPath
										? this.destinationPath
										: websiteDestinationPath,
									concatConfigStyle.dest,
									concatConfigStyle.name,
								]
									.filter(
										(concatConfigStyle) =>
											concatConfigStyle != ''
									)
									.join('/') + '.css'
							)
						}
					)

					return new Promise((resolve) => {
						src(pathFilesToConcat)
							.pipe(concat(`${mainConfigStyle.name}.css`))
							.pipe(
								dest(
									this.destinationPath
										? this.destinationPath
										: `${websiteDestinationPath}/${mainConfigStyle.dest}`
								)
							)
							.on('end', () => {
								resolve()
							})
							.pipe(browserSync.reload({ stream: true }))
					})
				}
				await this.concatTasks[mainConfigStyle.name]()
			}
		)
	}

	@Task()
	async start() {
		this.createTasks((element) => {
			return this.task(element)
		})

		await this.loopTasks(async (element) => {
			await this.tasks[element.name]()
		})

		if (argv.watch && !argv.prod) {
			this.watch('style')
		}
	}

	@Task()
	async startProd() {
		await this.concatFiles()

		this.tasks = []

		this.configTask.forEach((v) => {
			if (v.concatWith) {
				return
			}

			v.files =
				[`./public`, getMode, v.dest, v.name]
					.filter((concatConfigStyle) => concatConfigStyle != '')
					.join('/') + '.css'

			this.tasks[v.name] = async () => {
				return await this.taskProd(v)
			}
		})

		await this.loopTasks(async (element) => {
			if (element.concatWith) {
				return
			}

			await this.tasks[element.name]()
		})
	}
}
