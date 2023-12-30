import {describe, it} from 'node:test';
import {strict as assert} from 'node:assert';
import {determineHandType, HandCards, HandType} from "./index";

describe('determineHandType', () => {

    const TEST_CASES: Array<{ input: string, expected: HandType }> = [
        { input: 'AAAAA', expected: 'five-of-a-kind'},
        { input: 'AAAAJ', expected: 'five-of-a-kind'},
        { input: 'AAAJJ', expected: 'five-of-a-kind'},
        { input: 'AAJJJ', expected: 'five-of-a-kind'},
        { input: 'AJJJJ', expected: 'five-of-a-kind'},
        { input: 'JJJJJ', expected: 'five-of-a-kind'},

        { input: 'AAAAT', expected: 'four-of-a-kind' },
        { input: 'AAAJT', expected: 'four-of-a-kind' },
        { input: 'AAJJT', expected: 'four-of-a-kind' },
        { input: 'AJJJT', expected: 'four-of-a-kind' },

        { input: 'AAATT', expected: 'full-house' },
        { input: 'AAJTT', expected: 'full-house' },

        { input: 'AAAT9', expected: 'three-of-a-kind' },
        { input: 'AAJT9', expected: 'three-of-a-kind' },
        { input: 'AJJT9', expected: 'three-of-a-kind' },

        { input: 'AAKKT', expected: 'two-pair' },

        { input: 'AAT98', expected: 'one-pair' },
        { input: 'AJT98', expected: 'one-pair' },

        { input: 'AKQT98', expected: 'high-card' },
    ];

    TEST_CASES.forEach((testCase) => {
        it(`should determine type for hand ${testCase.input}`, () => {
            const cards = testCase.input.split('') as HandCards;
            const expected = testCase.expected;

            assert.strictEqual(determineHandType(cards), expected);
        });
    });
});