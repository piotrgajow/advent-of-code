import {describe, it} from 'node:test';
import {strict as assert} from 'node:assert';
import {combineCycles, Cycle} from "./index";

describe('combineCycles', () => {

    const TEST_CASES: Array<{ a: Cycle, b: Cycle, expected: Cycle}> = [
        {a: { offset: 4, period: 8 }, b: { offset: 4, period: 5 }, expected: { offset: 4, period: 40 } },
        {a: { offset: 3, period: 8 }, b: { offset: 7, period: 5 }, expected: { offset: 27, period: 40 } },
        {a: { offset: 7, period: 8 }, b: { offset: 3, period: 5 }, expected: { offset: 23, period: 40 } },

    ];

    TEST_CASES.forEach((testCase, i) => {
        const {a, b, expected} = testCase;
        it(`should combine cycles [${i}]`, () => {
            assert.deepEqual(combineCycles(a, b), expected);
        });
    });
});
