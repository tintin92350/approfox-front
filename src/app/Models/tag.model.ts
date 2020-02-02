export class Tag {
    public tagId: number;
    public departmentId: number;
    public name: string;

    constructor(tagId: number, departmentId: number, name: string) {
        this.tagId = tagId;
        this.departmentId = departmentId;
        this.name = name;
    }
}
