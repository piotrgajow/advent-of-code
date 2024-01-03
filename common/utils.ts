export function add(acc: number, curr: number): number {
    return acc + curr;
}

export function multiply(acc: number, curr: number): number {
    return acc * curr;
}

export function notEmpty(input: string): boolean {
    return !!input;
}

export function gcd(a: number, b: number): number {
    return b == 0 ? a : gcd(b, a % b);
}

export function lcm(a: number, b: number): number {
    return a / gcd(a,b) * b;
}

export function stringSplice(input: string, pos: number, insert: string, toDelete: number = 0): string {
    const array = input.split('');
    array.splice(pos, toDelete, insert);
    return array.join('');
}