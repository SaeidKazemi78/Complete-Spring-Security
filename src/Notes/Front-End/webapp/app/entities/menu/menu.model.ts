export class Menu {
    constructor(
        public id?: number,
        public translate?: string,
        public title?: string,
        public priority?: number,
        public name?: string,
        public icon?: string,
        public routerLink?: string,
        public queryParams?: string,
        public query?: any,
        public auth?: string[],
        public count?: number,
        public level?: number,
        public heights?: string,
        public collapseIn?: boolean,
        public collapsing?: boolean,
        public subMenu?: Menu[],
        public parentId?: number,
    ) {
        this.collapseIn = false;
        this.collapsing = false;
    }
}
