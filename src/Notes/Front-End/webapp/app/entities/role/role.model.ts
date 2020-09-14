import {MainAuthority} from '../main-authority/main-authority.model';

export class Role {
    constructor(
        public id?: number,
        public name?: string,
        public activated?: boolean,
        public authoritiesId?: number,
        public denyAuthoritiesId?: number,
        public authorities?: MainAuthority[],
        public denyAuthorities?: MainAuthority[],
        public roleType?: any,
        public userType?: any,
        public defaultRole?: any,
        public roleLevelId?: number,
        public roleLevelName?: string,
        public childRoles?: Role[] | any[],
    ) {
        this.activated = true;
        this.defaultRole = false;
    }
}

export class UserRole {
    constructor(public role: Role,
                public grantable: boolean) {

    }

}
