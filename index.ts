import { isSolution } from "./common";

run();

async function run(): Promise<void> {
    const year = process.argv[2];
    const task = process.argv[3];
    const part = process.argv[4];

    const solutionPath = `./${year}/${task}/${part}`;
    try {
        const solution = (await import(solutionPath)).default;
        if (!isSolution(solution)) {
            console.error(`Task solution at ${solutionPath} does not follow Solution interface`);
            return;
        }
        solution.run();
    } catch (e) {
        if (e.code === 'ERR_MODULE_NOT_FOUND') {
            console.error(`Could not find task solution at ${solutionPath}`);
            return;
        }
        throw e;
    }
}