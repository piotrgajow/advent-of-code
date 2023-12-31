import {Parser, TaskSolution} from "../../../common";

const TASK_NO = '8';

interface Node {
    id: string;
    L: string;
    R: string;
}

function solve(input: string): string {
    const result = new NetworkParser(input).get().navigate().getSteps();
    return String(result);
}

class Network {

    private readonly instructions: string;
    private readonly map: Record<string, Node>;

    private steps: number = 0;
    private current: string = 'AAA';

    constructor(nodes: Node[], instructions: string) {
        this.instructions = instructions;
        this.map = nodes.reduce((acc, curr) => {
            acc[curr.id] = curr;
            return acc;
        }, {} as Record<string, Node>);
    }

    public navigate(): Network {
        const len = this.instructions.length;

        while (this.current !== 'ZZZ') {
            const i = this.steps % len;
            this.current = this.map[this.current][this.instructions[i]];
            this.steps++;
        }

        return this;
    }

    public getSteps(): number {
        return this.steps;
    }

}

class NetworkParser extends Parser<Network> {

    protected parse(input: string): Network {
        const [instructions, _, ...nodeStrings] = input.split('\n');
        const nodes = nodeStrings.map(this.parseNode);

        return new Network(nodes, instructions);
    }

    private parseNode(input: string): Node {
        const found = input.match(/(?<id>[A-Z]{3}) = \((?<L>[A-Z]{3}). (?<R>[A-Z]{3})\)/);

        return {id: found.groups.id, L: found.groups.L, R: found.groups.R};
    }

}


const TESTS = [
    [`./2023/${TASK_NO}/1/test1.txt`, '2'],
    [`./2023/${TASK_NO}/1/test2.txt`, '6']
];

export default new TaskSolution(solve, `./2023/${TASK_NO}/input.txt`, ...TESTS);
