import {MainAuthority} from '../main-authority';
export class ParentAuthority {
    constructor(
        public name?: string,
        public persianName?: string,
        public parentAuthorityId?: string,
        public authorities?: MainAuthority[]
    ) {
    }
}
