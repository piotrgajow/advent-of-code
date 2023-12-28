import {add, Parser, TaskSolution} from "../../../common";

interface Card {
    id: number;
    instances: number;
    winning: number[];
    have: number[];
}

function solve(input: string): string {
    const result = new CardsParser(input).get()
        .map((it) => it.instances)
        .reduce(add, 0);
    return String(result);
}

class CardsParser extends Parser<Card[]> {
    private lines: string[];
    private cards: Card[] = [];
    private copies: number[] = [];

    constructor(input: string) {
        super(input);
    }

    protected parse(input: string): Card[] {
        this.lines = input.split('\n');

        this.lines.forEach((line) => {
            const found = line.match(/Card +(?<id>\d+):(?<winning>.*)\|(?<have>.*)/);
            const id = Number(found.groups.id);
            const winning = found.groups.winning.split(' ').filter((it) => !!it).map((it) => Number(it));
            const have = found.groups.have.split(' ').filter((it) => !!it).map((it) => Number(it));
            const matched = have.filter((it) => winning.includes(it)).length;
            const instances = 1 + (this.copies.shift() ?? 0);
            this.bumpInstances(matched, instances);
            this.cards.push({id, winning, have, instances});
        });

        return this.cards;
    }

    private bumpInstances(count: number, instances: number): void {
        for (let i = 0; i < count; i++) {
            this.copies[i] ??= 0;
            this.copies[i] += instances;
        }
    }

}

const TESTS = [
    ['./2023/4/1/test.txt', '30'],
];

export default new TaskSolution(solve, './2023/4/input.txt', ...TESTS);
