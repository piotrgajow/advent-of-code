import {add, TaskSolution} from "../../../common";

const TASK_NO = '7';

const CARDS = {
    'J': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    'T': 10,
    'Q': 11,
    'K': 12,
    'A': 13
} as const;

const HAND_TYPES = {
    'high-card': 1,
    'one-pair': 2,
    'two-pair': 3,
    'three-of-a-kind': 4,
    'full-house': 5,
    'four-of-a-kind': 6,
    'five-of-a-kind': 7
} as const

type Card = keyof typeof CARDS;
export type HandType = keyof typeof HAND_TYPES;
export type HandCards = [Card, Card, Card, Card, Card];

interface Hand {
    cards: HandCards;
    bid: number;
    type: HandType;
}

function solve(input: string): string {
    const result = parse(input)
        .sort(handComparator)
        .map((hand, i) => hand.bid * (i + 1))
        .reduce(add, 0);
    return String(result);
}

function parse(input: string): Hand[] {
    const lines = input.split('\n');
    return lines.map((line) => {
        const [cardsString, bidString] = line.split(' ');
        const cards = cardsString.split('') as HandCards;
        const bid = Number(bidString);
        const type = determineHandType(cards);

        return {cards, bid, type};
    })
}

export function determineHandType(cards: HandCards): HandType {
    const cardCounts = cards.reduce((acc, curr) => {
        acc[curr] ??= 0;
        acc[curr]++;
        return acc;
    }, {} as Record<Card, number>);
    const jokerCount = cardCounts['J'] ?? 0;
    delete cardCounts['J'];
    const countValues = Object.values(cardCounts);

    // 5,41,32,311,221,2111,11111
    if (jokerCount === 5 || countValues.includes(5 - jokerCount)) {
        return 'five-of-a-kind';
    }
    if (countValues.includes(4 - jokerCount)) {
        return 'four-of-a-kind';
    }
    if (countValues.includes(3) && countValues.includes(2)) {
        return 'full-house';
    }
    if (countValues[0] === 2 && countValues[1] === 2 && jokerCount === 1) {
        return 'full-house';
    }
    if (countValues.includes(3 - jokerCount)) {
        return 'three-of-a-kind';
    }
    if (countValues.filter((it) => it === 2)?.length === 2) {
        return 'two-pair';
    }
    if (countValues.includes(2 - jokerCount)) {
        return 'one-pair';
    }
    return 'high-card';
}

function handComparator(a: Hand, b: Hand): number {
    let aScore: number = HAND_TYPES[a.type];
    let bScore: number = HAND_TYPES[b.type];
    if (aScore === bScore) {
        for (let i = 0; i < 5; i++) {
            aScore = CARDS[a.cards[i]];
            bScore = CARDS[b.cards[i]];
            if (aScore !== bScore) {
                return aScore - bScore;
            }
        }
        if (aScore === bScore) {
            return 0;
        }
    }
    return aScore - bScore
}

const TESTS = [
    [`./2023/${TASK_NO}/2/test.txt`, '5905'],
];

export default new TaskSolution(solve, `./2023/${TASK_NO}/input.txt`, ...TESTS);
