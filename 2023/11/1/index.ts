import {stringSplice, TaskSolution} from "../../../common";

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

    private readonly space: string[];

    constructor(input: string) {
        this.space = input.split('\n');
    }

    public expand(): Space {
        for (let i = 0; i < this.space.length; i++) {
            if (this.space[i].includes('#')) {
                continue;
            }
            this.space.splice(i, 0, structuredClone(this.space[i]));
            i++;
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
                for (let i = 0; i < this.space.length; i++) {
                    this.space[i] = stringSplice(this.space[i], j, '.');
                }
                j++;
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
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    }

}

const TESTS = [
    [`./2023/${TASK_NO}/1/test.txt`, '374'],
    [`./2023/${TASK_NO}/1/test1.txt`, '7'],
    [`./2023/${TASK_NO}/1/test2.txt`, '7'],
];

export default new TaskSolution(solve, `./2023/${TASK_NO}/input.txt`, ...TESTS);
