import * as fs from "fs";
import { websiteDestinationPath } from "./frontbox";

export interface IPugFiltersSvg {
	file: string;
	class: string;
	type: 'colored';
}

// https://github.com/BartoszPiwek/FrontBox-Static/wiki/Pug-filters#functions
export function svg(pug, args: IPugFiltersSvg) {
	const { file, type } = args;
	const addClass = args.class;

	const tagClass = `icon icon-${file} ${
		addClass ? addClass : ''
		}`.trim();

	const path = `./src/images/svg/${type ? type + '/' : ''}${file}.svg`;

	const svgFile = fs.readFileSync(path, 'utf8');

	if (type) {
		return svgFile;
	}

	return svgFile.replace(`<svg`, `<svg class="${tagClass}"`);
}

export interface IPugFiltersPagesLinks {
	path: string;
}
export function pagesLinks(pug, args: IPugFiltersPagesLinks) {
	const { path } = args;
	const files: string[] = fs.readdirSync(`./${websiteDestinationPath}/${path ? path : ''}`);

	return files
		.filter(file => file.endsWith('.html'))
		.map(file => {
			const name = file.slice(0, -5);

			return `<a href="${name}.html">${name}</a>`;
		}).join('<br>');
}

export function reverseText(text: string) {
	return text.split('').reverse().join('');
}

export function escape(text: string) {
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/#/g, '&#35;')
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '<br>');
};

export interface IPugFiltersIncludeOptional {
	file: string;
}
export function includeOptional(pug, args: IPugFiltersIncludeOptional) {
	const { file } = args;

	if (fs.existsSync(`./${file}`)) {
		return fs.readFileSync(`./${file}`, 'utf8');
	}

	console.warn(`File "${file}" doesn't exist - skip include.`);
	return '';
}
