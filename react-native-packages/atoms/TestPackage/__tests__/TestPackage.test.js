'use strict';

const TestPackage = require('..');
const assert = require('assert').strict;

assert.strictEqual(TestPackage(), 'Hello from TestPackage');
console.info('TestPackage tests passed');
