import {Solution, TaskTest} from "./index";
import {readFile} from "node:fs/promises";

export class TaskSolution implements Solution {

    readonly #inputFile: string;
    readonly #tests: TaskTest[];
    readonly #process: (input: string) => string;

    constructor(process: (input: string) => string, inputFile: string, ...tests: TaskTest[]) {
        this.#process = process;
        this.#inputFile = inputFile;
        this.#tests = tests;
    }

    async run(): Promise<void> {
        const testResults = this.#tests.map(async ([testFile, expectedResult]) => {
            const result = await this.#run(testFile);
            if (result !== expectedResult) {
                console.log(`Test ${testFile} failed: Expected ${expectedResult}, got ${result}`);
                return false;
            }
            return true;
        });
        if ((await Promise.all(testResults)).every((it) => it)) {
            console.log('Tests Passed!');
            const result = await this.#run(this.#inputFile);
            console.log(`Result: ${result}`);
        }
    }

    async #run(fileName: string): Promise<string> {
        const input = await readFile(fileName, { encoding: 'utf-8' });
        return this.#process(input);
    }
}

