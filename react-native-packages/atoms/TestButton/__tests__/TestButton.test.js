'use strict';

const TestButton = require('../lib/TestButton');
const assert = require('assert').strict;

assert.strictEqual(TestButton(), 'Hello from TestButton');
console.info('TestButton tests passed');
