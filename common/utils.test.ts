import {describe, it} from 'node:test';
import {strict as assert} from 'node:assert';
import {gcd, lcm} from "./utils";

describe('gcd', () => {

    const TEST_CASES = [
        { a: 8, b: 5, expected: 1 },
        { a: 5, b: 8, expected: 1 },
        { a: 12, b: 16, expected: 4 },
        { a: 16, b: 12, expected: 4 },
    ];

    TEST_CASES.forEach((testCase) => {
        const { a, b, expected} = testCase;
        it(`should calculate greatest common denominator for ${a} & ${b}`, () => {
            assert.strictEqual(gcd(a, b), expected);
        });
    });
});

describe('lcm', () => {

    const TEST_CASES = [
        { a: 8, b: 5, expected: 40 },
        { a: 5, b: 8, expected: 40 },
        { a: 12, b: 16, expected: 48 },
        { a: 16, b: 12, expected: 48 },
    ];

    TEST_CASES.forEach((testCase) => {
        const { a, b, expected} = testCase;
        it(`should calculate least common multiple for ${a} & ${b}`, () => {
            assert.strictEqual(lcm(a, b), expected);
        });
    });
});