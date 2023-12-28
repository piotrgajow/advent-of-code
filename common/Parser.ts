export abstract class Parser<T> {

    private readonly input: string;
    private data: T;

    protected constructor(input: string) {
        this.input = input;
    }

    public get(): T {
        if (!this.data) {
            this.data = this.parse(this.input);
        }
        return this.data;
    }

    protected abstract parse(input: string): T;

}
