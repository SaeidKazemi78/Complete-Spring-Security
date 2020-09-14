import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {CeilingQuotaComponent} from './ceiling-quota.component';
import {CeilingQuotaPopupComponent} from './ceiling-quota-dialog.component';
import {CeilingQuotaDeletePopupComponent} from './ceiling-quota-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class CeilingQuotaResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
        };
    }
}

export const ceilingQuotaRoute: Routes = [
    {
        path: '',
        component: CeilingQuotaComponent,
        resolve: {
            'pagingParams': CeilingQuotaResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_CEILING_QUOTA'],
            pageTitle: 'niopdcgatewayApp.ceilingQuota.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ceilingQuotaPopupRoute: Routes = [
    {
        path: 'new/:customerCreditId',
        component: CeilingQuotaPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_CEILING_QUOTA'],
            pageTitle: 'niopdcgatewayApp.ceilingQuota.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit',
        component: CeilingQuotaPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_CEILING_QUOTA'],
            pageTitle: 'niopdcgatewayApp.ceilingQuota.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: CeilingQuotaDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_CEILING_QUOTA'],
            pageTitle: 'niopdcgatewayApp.ceilingQuota.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:view',
        component: CeilingQuotaPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_CEILING_QUOTA'],
            pageTitle: 'niopdcgatewayApp.ceilingQuota.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
