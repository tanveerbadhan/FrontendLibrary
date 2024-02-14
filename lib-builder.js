#!/usr/bin/env node
const path = require('path');
const rollup = require('rollup');
const jsx = require('acorn-jsx');
const postcss = require('rollup-plugin-postcss');
const { terser } = require('rollup-plugin-terser');
const commonjs = require('@rollup/plugin-commonjs');
const babel = require('@rollup/plugin-babel').default;
const typescript = require('@rollup/plugin-typescript');
const external = require('rollup-plugin-peer-deps-external');
const resolve = require('@rollup/plugin-node-resolve').default;
const fs = require('fs');
var fsExtra = require('fs-extra');
// Current working path
const CURRENT_WORKING_PATH = process.cwd();
// Directories to check packages in
const DIRS_TO_CHECK = [
    path.join('react-packages', 'atoms'),
    path.join('react-packages', 'molecules'),
    path.join('react-native-packages', 'atoms'),
    path.join('react-native-packages', 'molecules')
];

// get command line arguments
const getCmdArgs = () => process.argv.slice(2);

// Utility function to check if the provided path is a directory or not
const isDir = (path) => {
    try {
        var stat = fs.lstatSync(path);
        return stat.isDirectory();
    } catch (e) {
        return false;
    }
};

// Main build function
async function build() {
    try {
        console.log('Packages to build dist for :: ', getCmdArgs());

        // Removing duplicates and storing only unique package names in the Set()
        const filesToBuild = getCmdArgs();
        const filesSet = new Set();
        for (let i = 0; i < filesToBuild.length; i++) filesSet.add(filesToBuild[i]);

        // Read the package from the packages directory
        for (const packageDir of DIRS_TO_CHECK) {
            // Get package directory
            const packages = path.join(CURRENT_WORKING_PATH, packageDir);
            const files = await fs.promises.readdir(packages);

            for (const file of files) {
                const pathToFile = path.join(CURRENT_WORKING_PATH, packageDir, file);

                if (isDir(pathToFile)) {
                    const packageJsonPath = path.join(pathToFile, 'package.json');
                    // extracting values from package.json, will use further
                    const { src, name } = require(packageJsonPath);

                    if (src) {
                        // Build input path using the value of src from the package.json
                        const inputPath = path.join(pathToFile, src);

                        // Final fileName
                        let fileName = '';
                        // Final Rollup configurations to consider for react/react-native packages
                        let ROLLUP_INPUT_OPTIONS = {};

                        // Separating concerns for react and react native package
                        if (name.includes('@React_UI_Lib/')) {
                            fileName = name.replace('@React_UI_Lib/', '');

                            // Rollup configurations for react packages
                            ROLLUP_INPUT_OPTIONS = {
                                input: inputPath,
                                // Add the dependencies here, add them in the peerDepencies of your individual packages for not to consider for final dist folders
                                external: ['react', 'styled-components'],
                                acornInjectPlugins: [jsx()],
                                plugins: [
                                    external(),
                                    resolve({}),
                                    babel({
                                        presets: [['@babel/preset-env'], '@babel/preset-react'],
                                        babelHelpers: 'runtime',
                                        plugins: [
                                            [
                                                '@babel/plugin-transform-runtime',
                                                {
                                                    useESModules: true
                                                }
                                            ],
                                            '@babel/plugin-proposal-export-default-from',
                                            '@babel/plugin-syntax-dynamic-import'
                                        ],
                                        exclude: 'node_modules/**'
                                    }),
                                    commonjs(),
                                    typescript({
                                        tsconfig: './tsconfig.json'
                                    }),
                                    postcss(),
                                    terser()
                                ]
                            };
                        } else {
                            fileName = name.replace('@Frontend_Lib/', '');

                            // Rollup configurations for react-native packages
                            ROLLUP_INPUT_OPTIONS = {
                                input: inputPath,
                                external: [
                                    'react',
                                    'react-native',
                                    'react-native-linear-gradient',
                                    'react-native-gesture-handler'
                                ],
                                acornInjectPlugins: [jsx()],
                                plugins: [
                                    external(),
                                    resolve({}),
                                    babel({
                                        presets: [
                                            '@babel/preset-env',
                                            '@babel/preset-react',
                                            'metro-react-native-babel-preset'
                                        ],
                                        babelHelpers: 'bundled',
                                        exclude: 'node_modules/**'
                                    }),
                                    commonjs(),
                                    typescript({
                                        tsconfig: './tsconfig.json'
                                    }),
                                    postcss(),
                                    terser()
                                ]
                            };
                        }

                        // Rollup output options
                        const ROLLUP_OUTPUT_OPTIONS = [
                            {
                                file: `${pathToFile}/dist/${fileName}.cjs.js`,
                                format: 'cjs'
                            },
                            {
                                file: `${pathToFile}/dist/${fileName}.esm.js`,
                                format: 'esm'
                            }
                        ];

                        // Check names in the fileSet and only create dist for them,
                        if (filesSet.has(fileName)) {
                            const assetFol = path.join(pathToFile, '/lib/assets');
                            const bundle = await rollup.rollup(ROLLUP_INPUT_OPTIONS);

                            ROLLUP_OUTPUT_OPTIONS.forEach(async (options) => {
                                try {
                                    await bundle.write(options);
                                    if (isDir(assetFol)) {
                                        fsExtra.copy(assetFol, `${pathToFile}/dist/assets`, () => {
                                            console.log('Assets copied successfully');
                                        });
                                    }
                                } catch (err) {
                                    console.log('Error while bundling...', err);
                                }
                            });
                        }
                    }
                }
            }
        }
    } catch (e) {
        console.error("Unable to create dist... we've thrown! Whoops!", e);
    }
}

// Run build()
build();
