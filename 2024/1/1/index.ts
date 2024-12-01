import {TaskSolution} from "../../../common";

const TASK_NO = '1';

function solve(input: string): string {
    const lines = input.replaceAll(/ +/g , ' ').split('\n');
    const left = [];
    const right = [];
    lines.forEach((line) => {
        const [a, b] = line.split(' ');
        left.push(Number(a));
        right.push(Number(b));
    });
    left.sort();
    right.sort();
    let result = 0;
    for (let i = 0; i < left.length; i++) {
        result += Math.abs(left[i] - right[i]);
    }

    return String(result);
}

const TESTS = [
    [`./2024/${TASK_NO}/1/test.txt`, '11'],
];

export default new TaskSolution(solve, `./2024/${TASK_NO}/input.txt`, ...TESTS);

