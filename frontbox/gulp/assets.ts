import { dest, src, task } from 'gulp'
import * as favicons from 'gulp-favicons'
import * as imagemin from 'gulp-imagemin'
import * as newer from 'gulp-newer'
import * as svgmin from 'gulp-svgmin'

task('generateFavicons', () => {
	return src(`./src/images/favicon.png`)
		.pipe(
			favicons({
				path: '/favicons',
				display: 'standalone',
				orientation: 'portrait',
				scope: '/',
				start_url: '/',
				version: 1.0,
				html: 'index.html',
				pipeHTML: true,
				replace: false,
				logging: false
			})
		)
		.pipe(dest(`./src/favicons`));
})

task('optimizeSvgBase', () => {
	return src('./src/images/svg/*.svg')
		.pipe(newer(`./src/images/svg/*.svg`))
		.pipe(
			svgmin({
				plugins: [
					{ removeXMLProcInst: true },
					{ removeComments: true },
					{ removeDoctype: true },
					{ removeViewBox: false },
					{ removeUselessStrokeAndFill: true },
					{ removeStyleElement: true },
					{
						removeAttrs: {
							attrs: [
								'xmlns',
								'fill',
								'class',
								'stroke',
								'width',
								'height',
								'id',
							],
						},
					},
				],
			})
		)
		.pipe(dest(`./src/images/svg`))
})

task('optimizeSvgColored', () => {
	return src('./src/images/svg/colored/*.svg')
		.pipe(newer(`./src/images/svg/colored/*.svg`))
		.pipe(
			svgmin({
				plugins: [
					{ removeXMLProcInst: true },
					{ removeComments: true },
					{ removeDoctype: true },
					{ removeViewBox: false },
					{ removeUselessStrokeAndFill: true },
					{
						removeAttrs: {
							attrs: ['xmlns', 'stroke', 'width', 'height', 'id'],
						},
					},
				],
			})
		)
		.pipe(dest(`./src/images/svg/colored`))
})

task('optimizeImages', () => {
	return src(`src/images/**/*.{png,jpg,gif}`)
		.pipe(newer(`src/images/**/*.{png,jpg,gif}`))
		.pipe(imagemin())
		.pipe(dest(`src/images/`))
})
