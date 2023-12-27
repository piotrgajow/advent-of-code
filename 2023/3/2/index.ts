import {TaskSolution} from "../../../common/TaskSolution";
import {add} from "../../../common/utils";

interface Gear {
    a: number;
    b: number;
}


function solve(input: string): string {
    const result = new SchematicParser(input).getGears()
        .map((it) => it.a * it.b)
        .reduce(add, 0);
    return String(result);
}

class SchematicParser {
    readonly #lines: string[];
    readonly #gears: Gear[];

    #i: number;
    #j: number;
    #numbers: string[];

    constructor(input: string) {
        this.#lines = input.split('\n');
        this.#gears = [];
        this.#parse();
    }

    getGears(): Gear[] {
        return this.#gears;
    }

    #parse(): void {
        for (let i = 0; i < this.#lines.length; i++) {
            for (let j = 0; j < this.#lines[i].length; j++) {
                const char = this.#lines[i][j];

                if (char === '*') {
                    this.#i = i;
                    this.#j = j;
                    this.#checkForGear();
                }
            }
        }
    }

    #checkForGear(): void {
        this.#numbers = [];
        this.#checkForNumber(this.#i, this.#j - 1);
        this.#checkForNumber(this.#i, this.#j + 1);
        this.#checkOtherRow(this.#i - 1);
        this.#checkOtherRow(this.#i + 1);

        if (this.#numbers.length === 2) {
            this.#gears.push({ a: Number(this.#numbers[0]), b: Number(this.#numbers[1]) });
        }
    }

    #checkForNumber(row: number, start: number): void {
        const line = this.#lines[row];

        if (!/\d/.test(line[start])) {
            return;
        }

        let i = start;
        let value = '';

        while (/\d/.test(line[i])) {
            i--;
        }
        i++;
        while(/\d/.test(line[i])) {
            value += line[i];
            i++;
        }
        this.#numbers.push(value);
    }

    #checkOtherRow(row: number): void {
        const line = this.#lines[row];
        if (line === undefined) {
            return;
        }
        const middle = line[this.#j];
        if (/\d/.test(middle)) {
            this.#checkForNumber(row, this.#j);
        } else if (middle === '.') {
            this.#checkForNumber(row, this.#j - 1);
            this.#checkForNumber(row, this.#j + 1);
        }
    }

}

const TESTS = [
    ['./2023/3/2/test.txt', '467835'],
    ['./2023/3/2/test1.txt', '390'],
    ['./2023/3/2/test2.txt', '0'],
    ['./2023/3/2/test3.txt', '0']
];

export default new TaskSolution(solve, './2023/3/input.txt', ...TESTS);
