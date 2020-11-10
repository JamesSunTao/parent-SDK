import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import serve from 'rollup-plugin-serve'
import html from 'rollup-plugin-bundle-html'
import babel from 'rollup-plugin-babel'
import vuePlugin from 'rollup-plugin-vue'
import json from 'rollup-plugin-json'
import livereload from 'rollup-plugin-livereload'

export default {
    input: 'public/index.js',
    output: {
        file: 'dist/bundle.js',
        format: 'umd',
        name: 'bundle'
    },
    plugins: [
        resolve(),
        commonjs(),
        json(),
        vuePlugin(),
        html({
            template: 'public/index.html',
            dest: "dist",
            filename: 'index.html'
        }),
        babel({
            exclude: 'node_modules/**',
            runtimeHelpers: true,
        }),
        serve({ // 开启本地服务
            open: true,
            openPage: '/index.html', // 打开的页面
            port: 3500,
            contentBase: 'dist'
        }),
        livereload({watch: 'dist'})
    ],
}