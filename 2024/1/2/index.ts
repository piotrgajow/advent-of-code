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

    const occurrences = {};
    right.forEach((it) => {
        occurrences[it] = (occurrences[it] ?? 0) + 1;
    });

    let result = 0;
    left.forEach((it) => {
        const val = occurrences[it] ?? 0;
        result += it * val;
    });

    return String(result);
}

const TESTS = [
    [`./2024/${TASK_NO}/2/test.txt`, '31'],
];

export default new TaskSolution(solve, `./2024/${TASK_NO}/input.txt`, ...TESTS);

