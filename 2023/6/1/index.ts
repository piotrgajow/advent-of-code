import {multiply, notEmpty, TaskSolution} from "../../../common";

interface Race {
    time: number;
    distance: number;
}

function solve(input: string): string {
    const result = parse(input)
        .map(getNumberOfWaysToWin)
        .reduce(multiply, 1);
    return String(result);
}

function parse(input: string): Race[] {
    const found = input.match(/Time:\W*(?<times>.*)\nDistance:\W*(?<distances>.*)/);
    const times = found.groups.times.split(' ').filter(notEmpty).map(Number);
    const distances = found.groups.distances.split(' ').filter(notEmpty).map(Number);
    if (times.length !== distances.length) {
        throw new Error('times and distances array have different length');
    }

    const races: Race[] = [];

    for (let i = 0; i < times.length; i++) {
        races.push({time: times[i], distance: distances[i]});
    }

    return races;
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
    ['./2023/6/1/test.txt', '288'],
];

export default new TaskSolution(solve, './2023/6/input.txt', ...TESTS);
