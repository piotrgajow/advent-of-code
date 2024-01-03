import {stringSplice, TaskSolution} from "../../../common";

const TASK_NO = '10';

function solve(input: string): string {
    const result = new Pipes(input).getPointsInside();
    return String(result);
}

interface Coords {
    row: number;
    col: number;
}

type LoopPoints = Map<string, number>

type Direction = 'N' | 'S' | 'W' | 'E'

const ELEMENTS: Record<string, Direction[]> = {
    '|': ['N', 'S'],
    '-': ['E', 'W'],
    'L': ['N', 'E'],
    'J': ['N', 'W'],
    '7': ['S', 'W'],
    'F': ['S', 'E'],
    '.': [],
    'S': ['N', 'S', 'E', 'W']
}

class Pipes {
    private readonly map: string[];

    private toCheck: Coords[] = [];
    private loopPoints: LoopPoints = new Map();
    private pointsInsideCount: number = 0;

    constructor(input: string) {
        this.map = input.split('\n');

        this.findLoopPoints();
        this.calculatePointsInside();
    }

    public getPointsInside(): number {
        return this.pointsInsideCount;
    }

    private findLoopPoints(): void {
        const start = this.getStartingPoint();

        this.loopPoints.set(this.coordsToKey(start), 0);
        const startCheck: Array<{ coords: Coords; dir: Direction; start: Direction; }> = [
            {coords: {row: start.row - 1, col: start.col}, dir: 'S', start: 'N'},
            {coords: {row: start.row, col: start.col + 1}, dir: 'W', start: 'E'},
            {coords: {row: start.row + 1, col: start.col}, dir: 'N', start: 'S'},
            {coords: {row: start.row, col: start.col - 1}, dir: 'E', start: 'W'},
        ];

        const startDirections = startCheck.filter((it) => this.getElementDirections(it.coords).includes(it.dir))
            .map((it) => {
                this.loopPoints.set(this.coordsToKey(it.coords), 1);
                this.toCheck.push(it.coords);
                return it.start
            });

        const startElement = Object.entries(ELEMENTS)
            .find(([elem, dirs]) => dirs.includes(startDirections[0]) && dirs.includes(startDirections[1]))?.[0];

        this.map[start.row] = stringSplice(this.map[start.row], start.col, startElement, 1);

        while (this.toCheck.length) {
            this.checkPoint(this.toCheck.shift());
        }
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

    private calculatePointsInside(): void {
        for (let row = 0; row < this.map.length; row++) {
            let crossed = 0;
            let prev = '';
            for (let col = 0; col < this.map[row].length; col++) {
                if (this.loopPoints.has(this.coordsToKey({col, row}))) {
                    switch (this.map[row][col]) {
                        case '|':
                            crossed++;
                            break;
                        case 'L':
                            if (prev !== '') {
                                console.log('Error 1')
                            }
                            prev = 'L';
                            break;
                        case 'J':
                            if (prev === 'L') {
                                prev = '';
                            } else if (prev === 'F') {
                                crossed++;
                                prev = '';
                            } else {
                                console.log('Error 2');
                            }
                            break;
                        case '7':
                            if (prev === 'L') {
                                crossed++;
                                prev = '';
                            } else if (prev === 'F') {
                                prev = '';
                            } else {
                                console.log('Error 3');
                            }
                            break;
                        case 'F':
                            if (prev !== '') {
                                console.log('Error 4');
                            }
                            prev = 'F';
                            break;
                        case '.':
                        case 'S':
                            console.log('Error 5');
                            break;
                    }
                } else {
                    if (crossed % 2 === 1) {
                        this.pointsInsideCount++;
                    }
                }
            }
        }
    }

}

const TESTS = [
    [`./2023/${TASK_NO}/2/test1.txt`, '4'],
    [`./2023/${TASK_NO}/2/test2.txt`, '4'],
    [`./2023/${TASK_NO}/2/test3.txt`, '8'],
];

export default new TaskSolution(solve, `./2023/${TASK_NO}/input.txt`, ...TESTS);
