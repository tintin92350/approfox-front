export class CV {
    private filename: string;
    private data: any;

    constructor(filename: string, data: any) {
        this.data = data;
        this.filename = filename;
    }

    public get getFilename(): string {
        return this.filename;
    }

    public get getData(): string {
        return this.data;
    }

    public set setFilename(filename: string) {
        this.filename = filename;
    }

    public set setData(data: string) {
        this.data = data;
    }
}
