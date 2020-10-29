import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import { eslint } from 'rollup-plugin-eslint'
import replace from 'rollup-plugin-replace'
import { uglify } from 'rollup-plugin-uglify'

const packages = require('../package.json')
const ENV = process.env.NODE_ENV

const paths = {
    input: {         
        root:'src/index.js',
    },
    output: {
        root: 'lib/',
    },
}

const fileNames = {
    development: `jsdk.js`,
    production: `jsdk.min.js`
}

const fileName = fileNames[ENV]

export default {
    input: `${paths.input.root}`,
    output: {
        file: `${paths.output.root}${fileName}`,
        format: 'umd',
        name: 'jsdk'
    },
    plugins: [
        resolve(),
        commonjs(),
        eslint({
            include: ['src/**'],
            exclude: ['node_modules/**']
        }),
        babel({
            exclude: 'node_modules/**',
            runtimeHelpers: true,
        }),
        replace({
            exclude: 'node_modules/**',
            ENV: JSON.stringify(process.env.NODE_ENV),
            VERSION: packages.version
        }),
        (ENV === 'production' && uglify()),
    ],
    // 指出应将哪些模块视为外部模块
    external: ['cookies-js']
}