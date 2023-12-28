import {add, TaskSolution} from "../../../common";

interface Card {
    id: number;
    winning: number[];
    have: number[];
}

function solve(input: string): string {
    const result = input.split('\n')
        .map(parseCards)
        .map(getScore)
        .reduce(add, 0);
    return String(result);
}

function parseCards(input: string): Card {
    const found = input.match(/Card +(?<id>\d+):(?<winning>.*)\|(?<have>.*)/);
    const id = Number(found.groups.id);
    const winning = found.groups.winning.split(' ').filter((it) => !!it).map((it) => Number(it));
    const have = found.groups.have.split(' ').filter((it) => !!it).map((it) => Number(it));
    return {id, winning, have};
}

function getScore(card: Card): number {
    const matched = card.have.filter((it) => card.winning.includes(it));
    if (matched.length === 0) {
        return 0;
    }
    return Math.pow(2, matched.length - 1);
}

const TESTS = [
    ['./2023/4/1/test.txt', '13'],
];

export default new TaskSolution(solve, './2023/4/input.txt', ...TESTS);
