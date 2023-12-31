import {add, lcm, Parser, TaskSolution} from "../../../common";

const TASK_NO = '8';

interface Node {
    id: string;
    L: string;
    R: string;
}

interface PathCycle {
    offset: number;
    cycleParts: number[];
}

function solve(input: string): string {
    const result = new NetworkParser(input).get().getStepsToFinish();
    return String(result);
}

class Network {

    private readonly instructions: string;
    private readonly map: Record<string, Node>;
    private readonly start: string[];

    constructor(nodes: Node[], instructions: string) {
        this.instructions = instructions;
        this.map = nodes.reduce((acc, curr) => {
            acc[curr.id] = curr;
            return acc;
        }, {} as Record<string, Node>);
        this.start = nodes.reduce((acc, curr) => {
            return curr.id.endsWith('A') ? [...acc, curr.id] : acc;
        }, [] as string[]);
    }

    public getStepsToFinish(): number {
        const pathCycles = this.start.map(this.analysePath.bind(this));
        console.log(pathCycles)

        const simplifiedPaths: Cycle[] = pathCycles.map((it) => {
            return { offset: it.offset, period: it.cycleParts.reduce(add, 0) };
        });

        const first = simplifiedPaths.shift();

        const result = simplifiedPaths.reduce((acc, curr) => combineCycles(acc, curr), first);

        return result.offset;
    }

    private analysePath(start: string): PathCycle {
        const len = this.instructions.length;
        let i: number = 0;

        const viableEnds: string[] = [];
        let counter: number = 0;
        let analysed: boolean = false;
        let node: string = start;

        let offset: number = 0;
        const cycleParts: number[] = [];

        while (!analysed) {
            const instruction = this.instructions[i % len];
            node = this.map[node][instruction];
            i++
            counter++;
            if (node.endsWith('Z')) {
                if (viableEnds.length === 0) {
                    offset = counter;
                    counter = 0;
                    viableEnds.push(node);
                    continue;
                }

                if (viableEnds.includes(node)) {
                    cycleParts.push(counter);
                    analysed = true;
                } else {
                    viableEnds.push(node);
                    cycleParts.push(counter);
                    counter = 0;
                }
            }
        }

        return { offset, cycleParts };
    }

}

class NetworkParser extends Parser<Network> {

    protected parse(input: string): Network {
        const [instructions, _, ...nodeStrings] = input.split('\n');
        const nodes = nodeStrings.map(this.parseNode);

        return new Network(nodes, instructions);
    }

    private parseNode(input: string): Node {
        const found = input.match(/(?<id>.{3}) = \((?<L>.{3}), (?<R>.{3})\)/);

        return {id: found.groups.id, L: found.groups.L, R: found.groups.R};
    }

}

export interface Cycle {
    offset: number;
    period: number;
}

export function combineCycles(a: Cycle, b: Cycle): Cycle {
    const period = lcm(a.period, b.period);
    if (a.offset === b.offset) {
        return { offset: a.offset, period }
    }

    if (a.offset < b.offset) {
        const offset = getCombinedOffset(b.offset - a.offset, b.period, a.period);
        return { offset: a.offset + offset, period };
    } else {
        const offset = getCombinedOffset(a.offset - b.offset, a.period, b.period);
        return { offset: b.offset + offset, period };
    }
}

function getCombinedOffset(offset, periodA, periodB): number {
    let i = 0;
    while (true) {
        const value = periodA * i + offset;
        if (value % periodB === 0) {
            return value;
        }
        i++;
    }
}

const TESTS = [
    [`./2023/${TASK_NO}/2/test.txt`, '6'],
    // TODO more general case that can be explored but was not needed for the star
    // [`./2023/${TASK_NO}/2/test1.txt`, '17'],
];

export default new TaskSolution(solve, `./2023/${TASK_NO}/input.txt`, ...TESTS);
