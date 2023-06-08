/* eslint-env node */
import { extname } from 'node:path';
import terser from '@rollup/plugin-terser';

const FORMAT_EXTS = {
	'es': ['.mjs', '.js'],
	'esm': ['.mjs', '.js'],
	'module': ['.mjs', '.js'],
	'cjs': ['.cjs'],
	'iife': ['.min.js'],
};

export function getExtensionForFormat(format) {
	return FORMAT_EXTS[format][0];
}

export function warningHandler(warning) {
	if (warning.code === 'MISSING_GLOBAL_NAME' || warning.code === 'UNRESOLVED_IMPORT') {
		throw new Error(warning.message);
	} else if (warning.code !== 'CIRCULAR_DEPENDENCY') {
		console.warn(`(!) ${warning.message}`);
	}
}

export async function getConfig(input, {
	format = 'iife',
	sourcemap = true,
	onwarn = warningHandler,
	external = [],
	plugins = [],
	globals = {},
	minify = true,
} = {}) {
	const ext = extname(input);
	const file = input.replace(ext, getExtensionForFormat(format));

	if (minify) {
		plugins.push(terser());
	}

	const output = { file, format, sourcemap, globals };

	return { input, plugins, external, onwarn, output };
}
