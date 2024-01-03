import {TaskSolution} from "../../../common";

const TASK_NO = '11';

function solve(input: string): string {
    const result = new Space(input)
        .expand()
        .getSummedDistancesBetweenGalaxies()
    return String(result);
}

interface Galaxy {
    x: number;
    y: number;
}

class Space {

    private readonly expansionSize: number;
    private readonly space: string[];
    private readonly emptyRows: number[] = [];
    private readonly emptyColumns: number[] = [];

    constructor(input: string) {
        const [expansion, ...space] = input.split('\n');
        this.expansionSize = Number(expansion);
        this.space = space;
    }

    public expand(): Space {
        for (let i = 0; i < this.space.length; i++) {
            if (this.space[i].includes('#')) {
                continue;
            }
            this.emptyRows.push(i);
        }

        for (let j = 0; j < this.space[0].length; j++) {
            let hasGalaxy = false;
            for (let i = 0; i < this.space.length; i++) {
                if (this.space[i][j] === '#') {
                    hasGalaxy = true;
                    break;
                }
            }
            if (!hasGalaxy) {
                this.emptyColumns.push(j);
            }
        }

        return this;
    }

    public getSummedDistancesBetweenGalaxies(): number {
        const galaxies = this.findGalaxies();
        let totalDistances = 0;

        for (let i = 0; i < galaxies.length; i++) {
            for (let j = i + 1; j < galaxies.length; j++) {
                totalDistances += this.calculateDistance(galaxies[i], galaxies[j]);
            }
        }

        return totalDistances;
    }

    private findGalaxies(): Galaxy[] {
        const galaxies: Galaxy[] = [];
        for (let i = 0; i < this.space.length; i++) {
            for (let j = 0; j < this.space[i].length; j++) {
                if (this.space[i][j] === '#') {
                    galaxies.push({x: j, y: i});
                }
            }
        }
        return galaxies;
    }

    private calculateDistance(a: Galaxy, b: Galaxy): number {
        return this.calculateDimensionDistance(a.x, b.x, this.emptyColumns) + this.calculateDimensionDistance(a.y, b.y, this.emptyRows);
    }

    private calculateDimensionDistance(a: number, b: number, empty: number[]): number {
        const min = Math.min(a, b);
        const max = Math.max(a, b);

        const emptyCount = empty.filter((it) => min < it && it < max).length;

        return max - min - emptyCount + emptyCount * this.expansionSize;
    }

}

const TESTS = [
    [`./2023/${TASK_NO}/2/test1.txt`, '374'],
    [`./2023/${TASK_NO}/2/test2.txt`, '1030'],
    [`./2023/${TASK_NO}/2/test3.txt`, '8410'],
];

export default new TaskSolution(solve, `./2023/${TASK_NO}/2/input.txt`, ...TESTS);
