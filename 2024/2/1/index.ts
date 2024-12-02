import {TaskSolution} from "../../../common";

const YEAR = '2024'
const TASK_NO = '2';
const TASK_PART = '1';

function solve(input: string): string {
    const result = input.split('\n')
        .map((it) => checkLine(it))
        .reduce((acc, curr) => acc + curr, 0);
    return String(result);
}

function checkLine(line: string): number {
    const values = line.split(' ').map((it) => Number(it));
    const sign = Math.sign(values[0] - values[1]);

    for (let i = 1; i < values.length; i++) {
        const diff = values[i - 1] - values[i];
        if (diff === 0) {
            return 0;
        }
        if (Math.sign(diff) !== sign) {
            return 0;
        }
        if (Math.abs(diff) > 3) {
            return 0;
        }
    }
    return 1;
}


const TESTS = [
    [`./${YEAR}/${TASK_NO}/${TASK_PART}/test.txt`, '2'],
];

export default new TaskSolution(solve, `./${YEAR}/${TASK_NO}/input.txt`, ...TESTS);
