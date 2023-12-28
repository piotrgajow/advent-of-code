import {TaskSolution, Parser, notEmpty} from "../../../common";

interface SeedData {
    id: number;
    soil: number;
    fertilizer: number;
    water: number;
    light: number;
    temperature: number;
    humidity: number;
    location: number;
}

function solve(input: string): string {
    const result = new AlmanacParser(input).get()
        .map((it) => it.location)
        .reduce((acc, curr) => Math.min(acc, curr), Number.MAX_VALUE);
    return String(result);
}

const ALMANAC_MAPS = {
    'seed-to-soil': 'seedSoil',
    'soil-to-fertilizer': 'soilFertilizer',
    'fertilizer-to-water': 'fertilizerWater',
    'water-to-light': 'waterLight',
    'light-to-temperature': 'lightTemperature',
    'temperature-to-humidity': 'temperatureHumidity',
    'humidity-to-location': 'humidityLocation'
} as const;

type MapName = keyof typeof ALMANAC_MAPS;

class AlmanacParser extends Parser<SeedData[]> {

    private maps: Record<MapName, Mapping>;

    constructor(input: string) {
        super(input);
    }

    protected parse(input: string): SeedData[] {
        const mapPatterns = Object.entries(ALMANAC_MAPS).map(([k, v]) => `${k} map:\\n(?<${v}>.*)`);
        const pattern = `seeds:(?<seeds>.*)\\n\\n${mapPatterns.join('\\n\\n')}`;
        const regExp = new RegExp(pattern, 's');
        const found = input.match(regExp);

        this.maps = <Record<MapName, Mapping>>Object.fromEntries(
            Object.entries(ALMANAC_MAPS)
                .map(([key, group]) => [key, new MapParser(found.groups?.[group]).get()])
        );

        const seeds = found.groups.seeds;
        return seeds.split(' ')
            .filter(notEmpty)
            .map(this.mapSeeds.bind(this));
    }

    private mapSeeds(seedId: string): SeedData {
        const id = Number(seedId);
        const soil = this.maps["seed-to-soil"].map(id);
        const fertilizer = this.maps["soil-to-fertilizer"].map(soil);
        const water = this.maps["fertilizer-to-water"].map(fertilizer);
        const light = this.maps["water-to-light"].map(water);
        const temperature = this.maps["light-to-temperature"].map(light);
        const humidity = this.maps["temperature-to-humidity"].map(temperature);
        const location = this.maps["humidity-to-location"].map(humidity);

        return {
            id,
            soil,
            fertilizer,
            water,
            light,
            temperature,
            humidity,
            location,
        };
    }

}

class MappingRange {
    private readonly destination: number;
    private readonly source: number;
    private readonly range: number;

    constructor(destination: number, source: number, range: number) {
        this.destination = destination;
        this.source = source;
        this.range = range;
    }

    hasMappingFor(input: number): boolean {
        return input >= this.source && input < this.source + this.range;
    }

    map(input: number): number {
        return input - this.source + this.destination;
    }

}

class Mapping {

    private readonly ranges: MappingRange[];

    constructor(ranges: MappingRange[]) {
        this.ranges = ranges;
    }

    map(input: number): number {
        const range = this.ranges.find((it) => it.hasMappingFor(input));
        return range ? range.map(input) : input;
    }
}


class MapParser extends Parser<Mapping> {

    constructor(input: string) {
        super(input);
    }

    protected parse(input: string): Mapping {
        const lines = input.split('\n');
        const ranges: MappingRange[] = lines.map((line) => {
            const parts = line.split(' ');
            return new MappingRange(Number(parts[0]), Number(parts[1]), Number(parts[2]));
        });
        return new Mapping(ranges);
    }

}

const TESTS = [
    ['./2023/5/1/test.txt', '35'],
];

export default new TaskSolution(solve, './2023/5/input.txt', ...TESTS);
