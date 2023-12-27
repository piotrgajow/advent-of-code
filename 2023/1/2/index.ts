import {TaskSolution} from "../../../common/TaskSolution";
import {add} from "../../../common/utils";

const DIGIT_MAP = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
}

function overlappingRegex(line: string): string[] {
    const regExp = RegExp(/\d|one|two|three|four|five|six|seven|eight|nine|zero/g);
    const result: string[] = [];
    let tmp: RegExpExecArray | null;
    while (tmp = regExp.exec(line)) {
        result.push(tmp[0]);
        regExp.lastIndex = tmp.index + 1;
    }
    return result;
}

function getCalibrationValue(line: string): number {
    const found = overlappingRegex(line);
    if (!found) {
        return 0;
    }
    const left = found.at(0);
    const right = found.at(-1);
    const result = `${DIGIT_MAP[left] ?? left}${DIGIT_MAP[right] ?? right}`;
    return Number(result);
}

function solve(input: string): string {
    const result = input.split('\n')
        .map(getCalibrationValue)
        .reduce(add, 0);

    return String(result);
}

export default new TaskSolution(solve, './2023/1/input.txt', ['./2023/1/2/test.txt', '281']);
