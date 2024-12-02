import {TaskSolution} from "../../../common";

const YEAR = '2024'
const TASK_NO = '2';
const TASK_PART = '2';

function solve(input: string): string {
    const result = input.split('\n')
        .map((line) => {
            const values = line.split(' ').map((it) => Number(it))
            return checkLine(values)
        })
        .reduce((acc, curr) => acc + curr, 0);
    return String(result);
}

function checkLine(values: number[], firstTry: boolean = true): number {
    console.log(values.toString(), firstTry);
    const sign = Math.sign(values[0] - values[1]);

    for (let i = 1; i < values.length; i++) {
        const diff = values[i - 1] - values[i];
        if (checkDiff(diff, sign) === 0) {
            if (firstTry) {
                if (checkLine(values.toSpliced(i-1, 1), false)) {
                    console.log(1);
                    return 1;
                }
                if (checkLine(values.toSpliced(i, 1), false)) {
                    console.log(1);
                    return 1;
                }
                if (checkLine(values.toSpliced(0, 1), false)) {
                    console.log(1);
                    return 1;
                }
                console.log(0)
                return 0;
            } else {
                console.log(0);
                return 0;
            }
        }
    }
    console.log(1);
    return 1;
}

function checkDiff(diff: number, sign: number): 0 | 1 {
    if (diff === 0) {
        return 0;
    }
    if (Math.sign(diff) !== sign) {
        return 0;
    }
    if (Math.abs(diff) > 3) {
        return 0;
    }
    return 1;
}


const TESTS = [
    [`./${YEAR}/${TASK_NO}/${TASK_PART}/test.txt`, '4'],
    [`./${YEAR}/${TASK_NO}/${TASK_PART}/test2.txt`, '11'],
];

export default new TaskSolution(solve, `./${YEAR}/${TASK_NO}/input.txt`, ...TESTS);
