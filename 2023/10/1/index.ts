import {TaskSolution} from "../../../common";

const TASK_NO = '10';

function solve(input: string): string {
    const result = new Pipes(input).getLongestDistance();
    return String(result);
}

interface Coords {
    row: number;
    col: number;
}

type LoopPoints = Map<string, number>;

type Direction = 'N' | 'S' | 'W' | 'E';

const ELEMENTS: Record<string, Direction[]> = {
    '|': ['N', 'S'],
    '-': ['E', 'W'],
    'L': ['N', 'E'],
    'J': ['N', 'W'],
    '7': ['S', 'W'],
    'F': ['S', 'E'],
    '.': [],
    'S': ['N', 'S', 'E', 'W']
};

class Pipes {
    private readonly map: string[];

    private toCheck: Coords[] = [];
    private loopPoints: LoopPoints = new Map();

    constructor(input: string) {
        this.map = input.split('\n');
    }

    public getLongestDistance(): number {
        return [...this.findLoopPoints().values()]
            .reduce((acc, curr) => Math.max(acc, curr), 0);
    }

    private findLoopPoints(): LoopPoints {
        const start = this.getStartingPoint();

        this.loopPoints.set(this.coordsToKey(start), 0);
        const startCheck: Array<{ coords: Coords; dir: Direction; }> = [
            {coords: {row: start.row - 1, col: start.col}, dir: 'S'},
            {coords: {row: start.row, col: start.col + 1}, dir: 'W'},
            {coords: {row: start.row + 1, col: start.col}, dir: 'N'},
            {coords: {row: start.row, col: start.col - 1}, dir: 'E'},
        ];

        startCheck.forEach((it) => {
            if (this.getElementDirections(it.coords).includes(it.dir)) {
                this.loopPoints.set(this.coordsToKey(it.coords), 1);
                this.toCheck.push(it.coords);
            }
        });

        while (this.toCheck.length) {
            this.checkPoint(this.toCheck.shift());
        }

        return this.loopPoints;
    }

    private checkPoint(coords: Coords): void {
        const distance = this.loopPoints.get(this.coordsToKey(coords));
        const directions = this.getElementDirections(coords);

        directions.map((dir) => this.getPointInDirection(coords, dir))
            .filter((it) => !this.loopPoints.has(this.coordsToKey(it)))
            .forEach((it) => {
                this.loopPoints.set(this.coordsToKey(it), distance + 1);
                this.toCheck.push(it);
            });
    }

    private getPointInDirection(coords: Coords, direction: Direction): Coords {
        switch (direction) {
            case "N":
                return {row: coords.row - 1, col: coords.col};
            case "E":
                return {row: coords.row, col: coords.col + 1};
            case "S":
                return {row: coords.row + 1, col: coords.col};
            case "W":
                return {row: coords.row, col: coords.col - 1};
        }
    }

    private getElementDirections(coords: Coords): Direction[] {
        const element = this.map[coords.row][coords.col];
        return ELEMENTS[element] ?? [];
    }

    private coordsToKey(coords: Coords): string {
        return `${coords.row}|${coords.col};`
    }

    private getStartingPoint(): Coords {
        for (let row = 0; row < this.map.length; row++) {
            const col = this.map[row].indexOf('S');
            if (col !== -1) {
                return {row, col};
            }
        }
        throw new Error('Start not found');
    }

}

const TESTS = [
    [`./2023/${TASK_NO}/1/test1.txt`, '4'],
    [`./2023/${TASK_NO}/1/test2.txt`, '8'],
];

export default new TaskSolution(solve, `./2023/${TASK_NO}/input.txt`, ...TESTS);
