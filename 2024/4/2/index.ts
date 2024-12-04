import {TaskSolution} from "../../../common";

const YEAR = '2024'
const TASK_NO = '4';
const TASK_PART = '2';

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
                if (char === 'A') {
                    count += this.checkXmasAt(i, j);
                }
            }
        }
        return count;
    }

    public checkXmasAt(i: number, j: number): number {
        let nwse = false;
        let nesw = false;
        // NW SE
        if (this.checkLetter(i-1, j-1, 'M') && this.checkLetter(i+1, j+1, 'S')) {
            nwse = true;
        }
        if (this.checkLetter(i-1, j-1, 'S') && this.checkLetter(i+1, j+1, 'M')) {
            nwse = true;
        }
        // NE SW
        if (this.checkLetter(i-1, j+1, 'M') && this.checkLetter(i+1, j-1, 'S')) {
            nesw = true;
        }
        if (this.checkLetter(i-1, j+1, 'S') && this.checkLetter(i+1, j-1, 'M')) {
            nesw = true;
        }
        console.log(nwse, nesw)

        return (nwse && nesw) ? 1 : 0;
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
    [`./${YEAR}/${TASK_NO}/${TASK_PART}/test.txt`, '9'],
];

export default new TaskSolution(solve, `./${YEAR}/${TASK_NO}/input.txt`, ...TESTS);
