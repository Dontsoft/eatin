const packageJson = require('./package.json');
import { defineConfig } from 'rollup';
import { terser } from 'rollup-plugin-terser';
import resolve from "@rollup/plugin-node-resolve";
import scss from 'rollup-plugin-scss'
import commonjs from 'rollup-plugin-commonjs';
import vue from 'rollup-plugin-vue';
import typescript from 'rollup-plugin-typescript2';
import { babel } from '@rollup/plugin-babel';
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import alias from '@rollup/plugin-alias';
//import postcss from "rollup-plugin-postcss";
import autoprefixer from "autoprefixer";
const path = require('path');
import postcss from 'postcss';
const scssOptions = {
    includePaths: ['node_modules', 'src']
}

console.log(process.env.NODE_ENV);

export default defineConfig({
    input: 'src/index.ts',
    output: [
        {
            format: "cjs",
            file: "dist/" + packageJson.name + ".js",
            sourcemap: true
        },
        {
            format: "cjs",
            file: "dist/" + packageJson.name + ".min.js",
            sourcemap: true,
            plugins: [terser()]
        },
        {
            format: "esm",
            file: "dist/" + packageJson.name + ".esm.js",
            sourcemap: true
        }
    ],
    plugins: [
        peerDepsExternal(),
        resolve(),
        alias({
            entries: [
                {
                    find: '@', replacement: path.join(__dirname, './src'),
                },
                {
                    find: '~', replacement: path.join(__dirname, './node_modules')
                }
            ]
        }),
        typescript(),
        vue({
            target: "browser",
            preprocessOptions: {
                "scss": {
                    ...scssOptions
                }
            }
        }),
        commonjs(),
        babel({
            babelHelpers: 'bundled',
            exclude: 'node_modules/**'
        }),
        scss({
            ...scssOptions,
            sass: require('sass'),
            watch: 'src',
            processor: () => postcss([require('postcss-easy-import'), autoprefixer()]),
            outputStyle: process.env.NODE_ENV === 'production' ? 'compressed' : undefined

        })
    ],
    watch: {
        include: 'src/**',
        exclude: 'node_modules/**'
    }
})