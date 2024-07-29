export class Page {
    index: string;
    title: string;
    pgclassIndex: string;
    pgclassTitle: string;

    constructor(index: string, title: string, pgclassIndex: string,  pgclassTitle: string) {
        this.index = index;
        this.title = title;
        this.pgclassIndex = pgclassIndex;
        this.pgclassTitle = pgclassTitle;
    }
}
