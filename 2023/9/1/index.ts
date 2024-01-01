import {add, TaskSolution} from "../../../common";

const TASK_NO = '9';

function solve(input: string): string {
    const result = input.split('\n')
        .map((line) => line.split(' ').map(Number))
        .map(predictNextValue)
        .reduce(add, 0);
    return String(result);
}

function predictNextValue(sequence: number[]): number {
    const seqs = [sequence.reverse()];

    for (let i = 0; i < sequence.length; i++) {
        const diffs = [];
        for (let j = 0; j < sequence.length - i - 1; j++) {
            diffs.push(seqs[i][j] - seqs[i][j+1]);
        }
        if (diffs.every((it) => it === 0)) {
            let next = 0;
            for (let k = i; k >= 0 ; k--) {
                next += seqs[k][0];
            }
            return next;
        }
        seqs.push(diffs);
    }

    throw new Error('Sequence analysis error');
}

const TESTS = [
    [`./2023/${TASK_NO}/1/test.txt`, '114'],
    [`./2023/${TASK_NO}/1/test1.txt`, '4355342'],
];

export default new TaskSolution(solve, `./2023/${TASK_NO}/input.txt`, ...TESTS);
