export class CV {
    private filename: string;
    private data: any;
    private dateOfUpload: Date;
    private status: number;

    constructor(filename: string, data: any, dateOfUpload: Date, status: number) {
        this.data = data;
        this.filename = filename;
        this.dateOfUpload = dateOfUpload;
        this.status = status;
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
