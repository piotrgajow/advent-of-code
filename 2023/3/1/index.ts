import {add, Parser, TaskSolution} from "../../../common";

type Schematic = Array<SchematicNumber>;

interface SchematicNumber {
    value: number;
    isPart: boolean;
}

type ParserState = 'number' | 'not-number'

function solve(input: string): string {
    const result = new SchematicParser(input).get()
        .filter((it) => it.isPart)
        .map((it) => it.value)
        .reduce(add, 0);
    return String(result);
}

class SchematicParser extends Parser<Schematic> {
    private lines: string[];

    private schematic: SchematicNumber[] = [];
    private state: ParserState = 'not-number';
    private value: string = '';
    private isPart: boolean = false;
    private i: number;
    private j: number;
    private char: string;

    constructor(input: string) {
        super(input);
    }

    protected parse(input: string): Schematic {
        this.lines = input.split('\n').map((it) => it.trim());

        for (let i = 0; i < this.lines.length; i++) {
            for (let j = 0; j < this.lines[i].length; j++) {
                const char = this.lines[i][j];
                this.i = i;
                this.j = j;
                this.char = char;

                if (/\d/.test(char)) {
                    this.onDigit();
                } else {
                    this.onOtherChar();
                }
            }
            if (this.state === 'number') {
                this.addNumber();
            }
        }
        return this.schematic;
    }

    private onDigit(): void {
        switch (this.state) {
            case "not-number":
                this.state = 'number';
                this.extendNumber();
                return;
            case "number":
                this.extendNumber();
                return;
        }
    }

    private onOtherChar(): void {
        switch (this.state) {
            case "not-number":
                return;
            case "number":
                this.addNumber();
                return;
        }
    }

    private extendNumber(): void {
        this.value += this.char;
        if (this.isPart) {
            return;
        }
        this.isPart = this.isSymbol(this.i - 1, this.j - 1) ||
            this.isSymbol(this.i - 1, this.j) ||
            this.isSymbol(this.i - 1, this.j + 1) ||
            this.isSymbol(this.i, this.j + 1) ||
            this.isSymbol(this.i + 1, this.j + 1) ||
            this.isSymbol(this.i + 1, this.j) ||
            this.isSymbol(this.i + 1, this.j - 1) ||
            this.isSymbol(this.i, this.j - 1)
    }

    private isSymbol(i: number, j: number): boolean {
        const char: string | undefined = this.lines[i]?.[j];
        if (char === undefined) {
            return false;
        }
        if (char.charCodeAt(0) === 13) {
            return false;
        }
        if (/\d/.test(char)) {
            return false;
        }
        return char !== '.';
    }

    private addNumber() {
        const number = {value: Number(this.value), isPart: this.isPart};
        this.schematic.push(number);
        this.state = 'not-number';
        this.isPart = false;
        this.value = '';
    }

}

const TESTS = [
    ['./2023/3/1/test.txt', '4361'],
    ['./2023/3/1/test2.txt', '8'],
    ['./2023/3/1/test3.txt', '0']
];

export default new TaskSolution(solve, './2023/3/input.txt', ...TESTS);
