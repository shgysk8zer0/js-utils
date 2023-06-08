import { getConfig } from './rollup.js';

export default await getConfig('./rollup.js', {
	format: 'cjs',
	external: ['node:path', '@rollup/plugin-terser'],
	sourcemap: false,
	minify: false,
});
