import {TaskSolution} from "../../../common/TaskSolution";
import {add} from "../../../common/utils";

interface Card {
    id: number;
    instances: number;
    winning: number[];
    have: number[];
}

function solve(input: string): string {
    const result = new CardsParser(input)
        .getCards()
        .map((it) => it.instances)
        .reduce(add, 0);
    return String(result);
}

class CardsParser {
    readonly #lines: string[];
    readonly #cards: Card[];

    readonly #copies: number[];

    constructor(input: string) {
        this.#lines = input.split('\n');
        this.#cards = [];
        this.#copies = [];
        this.#parse();
    }

    getCards(): Card[] {
        return this.#cards;
    }

    #parse(): void {
        this.#lines.forEach((line) => {
            const found = line.match(/Card +(?<id>\d+):(?<winning>.*)\|(?<have>.*)/);
            const id = Number(found.groups.id);
            const winning  = found.groups.winning.split(' ').filter((it) => !!it).map((it) => Number(it));
            const have  = found.groups.have.split(' ').filter((it) => !!it).map((it) => Number(it));
            const matched = have.filter((it) => winning.includes(it)).length;
            const instances = 1 + (this.#copies.shift() ?? 0);
            this.#bumpInstances(matched, instances);
            this.#cards.push({ id, winning, have, instances });
        });
    }

    #bumpInstances(count: number, instances: number): void {
        for (let i = 0; i < count ; i++) {
            this.#copies[i] ??= 0;
            this.#copies[i] += instances;
        }
    }

}
const TESTS = [
    ['./2023/4/1/test.txt', '30'],
];

export default new TaskSolution(solve, './2023/4/input.txt', ...TESTS);
