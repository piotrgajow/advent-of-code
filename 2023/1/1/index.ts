import {TaskSolution} from "../../../common/TaskSolution";

function add(acc: number, curr: number): number {
    return acc + curr;
}

function getCalibrationValue(line: string): number {
    const found = line.match(/\d/g);
    if (!found) {
        return 0;
    }
    const left = found.at(0);
    const right = found.at(-1);
    const result = `${left}${right}`;
    return Number(result);
}

function solve(input: string): string {
    const result = input.split('\n')
        .map(getCalibrationValue)
        .reduce(add, 0);

    return String(result);
}

export default new TaskSolution(solve, './2023/1/1/test.txt', '142', './2023/1/1/input.txt')
