/*!
 * FrontBox-Static 0.0.2
 * Bartosz Piwek
 * https://github.com/BartoszPiwek/FrontBox-Static
 */
require('./frontbox/gulp/assets')

const argv = require('yargs').argv
const del = require('del')

import { Gulpclass, SequenceTask, Task } from 'gulpclass/Decorators'
import { FrontboxGulpCopy } from './frontbox/gulp/copy'
import { websiteDestinationPath } from './frontbox/gulp/frontbox'
import { FrontboxGulpHTML } from './frontbox/gulp/html'
import { FrontboxGulpScript } from './frontbox/gulp/script'
import { FrontboxGulpStyle } from './frontbox/gulp/style'

export const browserSync = require('browser-sync').create()

let copy: FrontboxGulpCopy
let script: FrontboxGulpScript
let style: FrontboxGulpStyle
let html: FrontboxGulpHTML

@Gulpclass()
export class Gulpfile {
	@Task()
	createServer(done) {
		return browserSync.init({
			open: false,
			host: 'localhost',
			proxy: false,
			port: 8080,
			server: {
				baseDir: websiteDestinationPath,
			},
		})
	}

	@Task()
	async cleanWebsite() {
		return del.sync(websiteDestinationPath)
	}

	@SequenceTask()
	website() {
		style = new FrontboxGulpStyle()
		html = new FrontboxGulpHTML()
		script = new FrontboxGulpScript()
		copy = new FrontboxGulpCopy()

		const sequenceTask = [];

		if (argv.clean) {
			sequenceTask.push('cleanWebsite')
		}

		if (argv.favicon) {
			sequenceTask.push('generateFavicons')
		}

		if (argv.optimized) {
			sequenceTask.push('optimizeAssets')
		}

		if (argv.generate) {
			sequenceTask.push('buildDevWebsite')
		}

		if (argv.generate && argv.prod) {
			sequenceTask.push('buildProdWebsite')
		}

		if (argv.server) {
			sequenceTask.push('createServer')
		}

		return sequenceTask;
	}

	@Task()
	async buildDevWebsite() {
		await copy.start()
		await html.start()
		await script.start()
		await style.start()
	}

	@Task()
	async buildProdWebsite(done) {
		await style.startProd()
	}

	@SequenceTask()
	optimizeAssets() {
		return ['optimizeSvgBase', 'optimizeSvgColored', 'optimizeImages']
	}
}
