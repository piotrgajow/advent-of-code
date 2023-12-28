import {add, Parser, TaskSolution} from "../../../common";

interface Gear {
    a: number;
    b: number;
}

function solve(input: string): string {
    const result = new SchematicParser(input).get()
        .map((it) => it.a * it.b)
        .reduce(add, 0);
    return String(result);
}

class SchematicParser extends Parser<Gear[]> {
    private lines: string[];
    private gears: Gear[] = [];
    private i: number;
    private j: number;
    private numbers: string[];

    constructor(input: string) {
        super(input);
    }

    protected parse(input: string): Gear[] {
        this.lines = input.split('\n');

        for (let i = 0; i < this.lines.length; i++) {
            for (let j = 0; j < this.lines[i].length; j++) {
                const char = this.lines[i][j];

                if (char === '*') {
                    this.i = i;
                    this.j = j;
                    this.checkForGear();
                }
            }
        }

        return this.gears;
    }

    private checkForGear(): void {
        this.numbers = [];
        this.checkForNumber(this.i, this.j - 1);
        this.checkForNumber(this.i, this.j + 1);
        this.checkOtherRow(this.i - 1);
        this.checkOtherRow(this.i + 1);

        if (this.numbers.length === 2) {
            this.gears.push({a: Number(this.numbers[0]), b: Number(this.numbers[1])});
        }
    }

    private checkForNumber(row: number, start: number): void {
        const line = this.lines[row];

        if (!/\d/.test(line[start])) {
            return;
        }

        let i = start;
        let value = '';

        while (/\d/.test(line[i])) {
            i--;
        }
        i++;
        while (/\d/.test(line[i])) {
            value += line[i];
            i++;
        }
        this.numbers.push(value);
    }

    private checkOtherRow(row: number): void {
        const line = this.lines[row];
        if (line === undefined) {
            return;
        }
        const middle = line[this.j];
        if (/\d/.test(middle)) {
            this.checkForNumber(row, this.j);
        } else if (middle === '.') {
            this.checkForNumber(row, this.j - 1);
            this.checkForNumber(row, this.j + 1);
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
