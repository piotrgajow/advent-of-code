import {TaskSolution} from "../../../common/TaskSolution";
import {add} from "../../../common/utils";

interface Game {
    id: number;
    cubes: Array<Cubes>;
}

interface Cubes {
    red: number;
    green: number;
    blue: number;
}

type Color = keyof Cubes;

const AVAILABLE: Cubes = {
    red: 12,
    green: 13,
    blue: 14,
};

function solve(input: string): string {
    const result = input.split('\n')
        .map(parseGame)
        .filter(isPossible)
        .map((it) => it.id)
        .reduce(add, 0);
    return String(result);
}

function parseGame(line: string): Game {
    const found = line.match(/Game (?<id>\d+):(?<cubes>.*)/);
    const id = Number(found.groups.id);
    const cubes = found.groups.cubes.split(';').map(parseCubes);
    return {
        id,
        cubes,
    }
}

function parseCubes(input: string): Cubes {
    return input.split(',')
        .map(parseColors)
        .reduce((acc, curr) => {
            return {
                red: curr.red ? Number(curr.red) : acc.red,
                green: curr.green ? Number(curr.green) : acc.green,
                blue: curr.blue ? Number(curr.blue) : acc.blue,
            }
        }, { red: 0, green: 0, blue: 0 });
}

function parseColors(input: string): Record<Color, string | undefined> {
    const found = input.match(/(?<red>\d+) red|(?<green>\d+) green|(?<blue>\d+) blue/);
    return found.groups as Record<Color, string | undefined>;
}

function isPossible(game: Game): boolean {
    return game.cubes.every((it) => it.red <= AVAILABLE.red && it.green <= AVAILABLE.green && it.blue <= AVAILABLE.blue);
}

export default new TaskSolution(solve, './2023/2/input.txt', ['./2023/2/1/test.txt', '8']);
