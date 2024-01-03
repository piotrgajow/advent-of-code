import {describe, it} from 'node:test';
import {strict as assert} from 'node:assert';
import {gcd, lcm, stringInsertAt, stringSplice} from "./utils";

describe('gcd', () => {

    const TEST_CASES = [
        {a: 8, b: 5, expected: 1},
        {a: 5, b: 8, expected: 1},
        {a: 12, b: 16, expected: 4},
        {a: 16, b: 12, expected: 4},
    ];

    TEST_CASES.forEach((testCase) => {
        const {a, b, expected} = testCase;
        it(`should calculate greatest common denominator for ${a} & ${b}`, () => {
            assert.strictEqual(gcd(a, b), expected);
        });
    });
});

describe('lcm', () => {

    const TEST_CASES = [
        {a: 8, b: 5, expected: 40},
        {a: 5, b: 8, expected: 40},
        {a: 12, b: 16, expected: 48},
        {a: 16, b: 12, expected: 48},
    ];

    TEST_CASES.forEach((testCase) => {
        const {a, b, expected} = testCase;
        it(`should calculate least common multiple for ${a} & ${b}`, () => {
            assert.strictEqual(lcm(a, b), expected);
        });
    });
});

describe('stringSplice', () => {
    const TEST_CASES = [
        {input: 'Lorem Ipsum', insert: '#', pos: 0, toDelete: undefined, expected: '#Lorem Ipsum'},
        {input: 'Lorem Ipsum', insert: '#', pos: 5, toDelete: undefined, expected: 'Lorem# Ipsum'},
        {input: 'Lorem Ipsum', insert: '#', pos: 11, toDelete: undefined, expected: 'Lorem Ipsum#'},
        {input: 'Lorem Ipsum', insert: '#', pos: 5, toDelete: 1, expected: 'Lorem#Ipsum'},
        {input: 'Lorem Ipsum', insert: '#', pos: 0, toDelete: 11, expected: '#'},
    ];

    TEST_CASES.forEach((testCase) => {
        const {input, insert, pos, toDelete, expected} = testCase;
        it(`for string ${input} should at position ${pos} delete ${toDelete} characters and insert string ${insert}`, () => {
            assert.strictEqual(stringSplice(input, pos, insert, toDelete), expected);
        });
    });
})