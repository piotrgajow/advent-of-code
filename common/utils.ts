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