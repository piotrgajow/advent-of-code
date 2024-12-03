import {TaskSolution} from "../../../common";

const YEAR = '2024'
const TASK_NO = '3';
const TASK_PART = '2';

function solve(input: string): string {
    let enabled = true;
    const result = input.split('\n')
        .reduce((acc, curr) => {
            const matches = curr.matchAll(/mul\((?<a>\d{1,3}),(?<b>\d{1,3})\)|do\(\)|don't\(\)/gm);
            for (const match of matches) {
                if (match[0] === "don't()") {
                    enabled = false;
                } else if (match[0] === "do()") {
                    enabled = true;
                } else if (enabled) {
                    acc += Number(match.groups.a) * Number(match.groups.b);
                }
            }
            return acc;
        }, 0);
    return String(result);
}

const TESTS = [
    [`./${YEAR}/${TASK_NO}/${TASK_PART}/test.txt`, '48'],
];

export default new TaskSolution(solve, `./${YEAR}/${TASK_NO}/input.txt`, ...TESTS);
