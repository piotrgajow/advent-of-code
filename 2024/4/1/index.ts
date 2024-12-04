import {TaskSolution} from "../../../common";

const YEAR = '2024'
const TASK_NO = '4';
const TASK_PART = '1';

function solve(input: string): string {
    return String(new XmasFinder(input).solve());
}

class XmasFinder {

    readonly #lines: string[];

    constructor(input: string) {
        this.#lines = input.split('\n')
    }

    public solve(): number {
        let count = 0;
        for (let i= 0; i < this.#lines.length; i++) {
            const line = this.#lines[i];
            for (let j = 0; j < line.length; j++) {
                const char = line.charAt(j);
                if (char === 'X') {
                    count += this.findXmasAt(i, j);
                }
            }
        }
        return count;
    }

    public findXmasAt(i: number, j: number): number {
        let count = 0;

        // W
        if (this.checkLetter(i, j-1, 'M') && this.checkLetter(i, j-2, 'A') && this.checkLetter(i, j-3, 'S')) {
            count++;
        }
        // NW
        if (this.checkLetter(i-1, j-1, 'M') && this.checkLetter(i-2, j-2, 'A') && this.checkLetter(i-3, j-3, 'S')) {
            count++;
        }
        // N
        if (this.checkLetter(i-1, j, 'M') && this.checkLetter(i-2, j, 'A') && this.checkLetter(i-3, j, 'S')) {
            count++;
        }
        // NE
        if (this.checkLetter(i-1, j+1, 'M') && this.checkLetter(i-2, j+2, 'A') && this.checkLetter(i-3, j+3, 'S')) {
            count++;
        }
        // E
        if (this.checkLetter(i, j+1, 'M') && this.checkLetter(i, j+2, 'A') && this.checkLetter(i, j+3, 'S')) {
            count++;
        }
        // SE
        if (this.checkLetter(i+1, j+1, 'M') && this.checkLetter(i+2, j+2, 'A') && this.checkLetter(i+3, j+3, 'S')) {
            count++;
        }
        // S
        if (this.checkLetter(i+1, j, 'M') && this.checkLetter(i+2, j, 'A') && this.checkLetter(i+3, j, 'S')) {
            count++;
        }
        // SW
        if (this.checkLetter(i+1, j-1, 'M') && this.checkLetter(i+2, j-2, 'A') && this.checkLetter(i+3, j-3, 'S')) {
            count++;
        }

        return count;
    }

    private checkLetter(i: number, j: number, c: string): boolean {
        if (i < 0 || i >= this.#lines.length) {
            return false;
        }
        const line = this.#lines[i];
        if (j < 0 || j >= line.length) {
            return false;
        }
        const char = line.charAt(j);
        return char === c;
    }

}

const TESTS = [
    [`./${YEAR}/${TASK_NO}/${TASK_PART}/test.txt`, '18'],
];

export default new TaskSolution(solve, `./${YEAR}/${TASK_NO}/input.txt`, ...TESTS);
