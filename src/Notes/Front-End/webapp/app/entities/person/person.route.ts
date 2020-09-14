import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {PersonComponent} from './person.component';
import {PersonPopupComponent} from './person-dialog.component';
import {PersonDeletePopupComponent} from './person-delete-dialog.component';
import {PersonRegisterDialogComponent} from './person-register-dialog.component';
import {PersonChangeStatusPopupComponent} from './person-change-status-dialog.component';
import {PersonCreateUserPopupComponent} from './person-create-user-dialog.component';
import {PersonCreditAccountPopupComponent} from './person-credit-account-dialog.component';
import {PersonFinderComponent} from './person-finder.component';
import {StakeholderDetailComponent} from './stakeholder-detail.component';
import {StakeholderPopupComponent} from './stakeholder-dialog.component';
import {StakeholderDeletePopupComponent} from './stakeholder-delete-dialog.component';
@Injectable({ providedIn: 'root' })
export class StakeholderResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const size = route.queryParams['size'] ? route.queryParams['size'] : ITEMS_PER_PAGE;
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,desc';
        return {
            page: this.paginationUtil.parsePage(page),
            size: this.paginationUtil.parsePage(size),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
        };
    }
}
@Injectable({ providedIn: 'root' })
export class PersonResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const size = route.queryParams['size'] ? route.queryParams['size'] : ITEMS_PER_PAGE;
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'fullName,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            size: this.paginationUtil.parsePage(size),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
        };
    }
}

export const personRoute: Routes = [
    {
        path: '',
        component: PersonComponent,
        resolve: {
            'pagingParams': PersonResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_PERSON', 'LIST_STAKEHOLDER'],
            pageTitle: 'niopdcgatewayApp.person.home.title',
            isTransport: false
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'finder',
        component: PersonFinderComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'niopdcgatewayApp.person.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: ':companyId/stakeholder',
        loadChildren: '../person/person.module#NiopdcgatewayPersonModule'

    }, {
        path: 'transport',
        component: PersonComponent,
        resolve: {
            'pagingParams': PersonResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_PERSON_TRANSPORT'],
            pageTitle: 'niopdcgatewayApp.person.home.transportTitle',
            isTransport: true
        },
        canActivate: [UserRouteAccessService]
    },
   {
        path: 'stakeholder/:id',
        component: StakeholderDetailComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'niopdcgatewayApp.stakeholder.home.title'
        },
        canActivate: [UserRouteAccessService]
    },

];

export const personPopupRoute: Routes = [
    {
        path: 'new',
        component: PersonPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_PERSON'],
            pageTitle: 'niopdcgatewayApp.person.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':companyId/new',
        component: PersonPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_STAKEHOLDER'],
            pageTitle: 'niopdcgatewayApp.stakeholder.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit',
        component: PersonPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_PERSON'],
            pageTitle: 'niopdcgatewayApp.person.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':companyId/:id/edit',
        component: PersonPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_STAKEHOLDER'],
            pageTitle: 'niopdcgatewayApp.stakeholder.home.title',
            stakeholder: true
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },

    {
        path: ':id/active',
        component: PersonChangeStatusPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CONFIRM_PERSON'],
            pageTitle: 'niopdcgatewayApp.person.home.title',
            status: 'active'

        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/de-active',
        component: PersonChangeStatusPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CONFIRM_PERSON'],
            pageTitle: 'niopdcgatewayApp.person.home.title',
            status: 'de-active'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/reject',
        component: PersonChangeStatusPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CONFIRM_PERSON'],
            pageTitle: 'niopdcgatewayApp.person.home.title',
            status: 'reject'

        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: PersonDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_PERSON'],
            pageTitle: 'niopdcgatewayApp.person.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'stakeholder/:id/delete',
        component: StakeholderDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_STAKEHOLDER'],
            pageTitle: 'niopdcgatewayApp.stakeholder.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:mode/user',
        component: PersonCreateUserPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_USER','EDIT_USER'],
            pageTitle: 'niopdcgatewayApp.person.home.titleCreateUser'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':companyId/:id/:view',
        component: PersonPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_STAKEHOLDER'],
            pageTitle: 'niopdcgatewayApp.stakeholder.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/credit-account',
        component: PersonCreditAccountPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREDIT_ACCOUNT_PERSON'],
            pageTitle: 'niopdcgatewayApp.person.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },

    {
        path: 'stakeholder/new',
        component: StakeholderPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'niopdcgatewayApp.stakeholder.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'stakeholder/:id/edit',
        component: StakeholderPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'niopdcgatewayApp.stakeholder.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'register',
        component: PersonRegisterDialogComponent,
        data: {
            authorities: [],
            pageTitle: 'niopdcgatewayApp.person.home.title',
            created: false
        }
    },
    {
        path: 'register/created',
        component: PersonRegisterDialogComponent,
        data: {
            authorities: [],
            pageTitle: 'niopdcgatewayApp.person.home.title',
            created: true
        }
    },

    {
        path: 'new/:companyId',
        component: PersonPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_STAKEHOLDER'],
            pageTitle: 'niopdcgatewayApp.stakeholder.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },

    {
        path: ':companyId/:id/edit',
        component: PersonPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_STAKEHOLDER'],
            pageTitle: 'niopdcgatewayApp.stakeholder.home.title',
            stakeholder: true
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },

    {
        path: 'person/:id/active',
        component: PersonChangeStatusPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CONFIRM_PERSON'],
            pageTitle: 'niopdcgatewayApp.person.home.title',
            status: 'active'

        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'person/:id/de-active',
        component: PersonChangeStatusPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CONFIRM_PERSON'],
            pageTitle: 'niopdcgatewayApp.person.home.title',
            status: 'de-active'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/reject',
        component: PersonChangeStatusPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CONFIRM_PERSON'],
            pageTitle: 'niopdcgatewayApp.person.home.title',
            status: 'reject'

        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'person/:id/:view',
        component: PersonPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_PERSON'],
            pageTitle: 'niopdcgatewayApp.person.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'stakeholder/:companyId/:id/:view',
        component: PersonPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_STAKEHOLDER'],
            pageTitle: 'niopdcgatewayApp.stakeholder.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:view',
        component: PersonPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_PERSON'],
            pageTitle: 'niopdcgatewayApp.person.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
