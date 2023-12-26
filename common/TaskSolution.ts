import {Solution} from "./index";
import {readFile} from "node:fs/promises";

export class TaskSolution implements Solution {

    readonly #inputFile: string;
    readonly #testFile: string;
    readonly #testExpected: string;
    readonly #process: (input: string) => string;

    constructor(process: (input: string) => string, testFile: string, testExpected: string, inputFile: string) {
        this.#process = process;
        this.#inputFile = inputFile;
        this.#testFile = testFile;
        this.#testExpected = testExpected;
    }

    async run(): Promise<void> {
        const testResult = await this.#run(this.#testFile);
        if (testResult !== this.#testExpected) {
            console.log(`Test failed: Expected ${this.#testExpected}, got ${testResult}`);
            return;
        }
        console.log('Test Passed!');
        const result = await this.#run(this.#inputFile);
        console.log(`Result: ${result}`);
    }

    async #run(fileName: string): Promise<string> {
        const input = await readFile(fileName, { encoding: 'utf-8' });
        return this.#process(input);
    }
}

