import {multiply, notEmpty, TaskSolution} from "../../../common";

interface Race {
    time: number;
    distance: number;
}

function solve(input: string): string {
    const result = getNumberOfWaysToWin(parse(input));
    return String(result);
}

function parse(input: string): Race {
    const found = input.match(/Time:\W*(?<times>.*)\nDistance:\W*(?<distances>.*)/);
    const time = Number(found.groups.times.replaceAll(' ', ''));
    const distance = Number(found.groups.distances.replaceAll(' ', ''));
    return { time, distance };
}

function getNumberOfWaysToWin(race: Race): number {
    let count = 0;
    for (let i = 0; i < race.time; i++) {
        const speed = i;
        const time = race.time - i;
        const distance = speed * time;
        if (distance > race.distance) {
            count++;
        }
    }
    return count;
}


const TESTS = [
    ['./2023/6/2/test.txt', '71503'],
];

export default new TaskSolution(solve, './2023/6/input.txt', ...TESTS);
