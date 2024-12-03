import {TaskSolution} from "../../../common";

const YEAR = '2024'
const TASK_NO = '3';
const TASK_PART = '1';

function solve(input: string): string {
    const result = input.split('\n')
        .reduce((acc, curr) => {
            const matches = curr.matchAll(/mul\((?<a>\d{1,3}),(?<b>\d{1,3})\)/gm);
            for (const match of matches) {
                acc += Number(match.groups.a) * Number(match.groups.b);
            }
            return acc;
        }, 0);
    return String(result);
}

const TESTS = [
    [`./${YEAR}/${TASK_NO}/${TASK_PART}/test.txt`, '161'],
];

export default new TaskSolution(solve, `./${YEAR}/${TASK_NO}/input.txt`, ...TESTS);
