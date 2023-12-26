export interface Solution {
    run: () => void;
}

export function isSolution(arg: unknown): arg is Solution {
    return !!arg && !!arg.run && typeof arg.run === 'function';
}
