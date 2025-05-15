import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'

export default [
	{
		input: 'src/index.ts',
		output: [
			{
				file: 'dist/index.cjs.js', // <- clearly CommonJS
				format: 'cjs',
				sourcemap: true,
			},
			{
				file: 'dist/index.esm.js',
				format: 'esm',
				sourcemap: true,
			},
		],
		plugins: [typescript({ tsconfig: './tsconfig.json' })],
	},
	{
		input: 'src/index.ts',
		output: {
			file: 'dist/index.d.ts',
			format: 'esm',
		},
		plugins: [dts()],
	},
]
