import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {FactorComponent} from './factor.component';
import {FactorPopupComponent} from './factor-dialog.component';
import {FactorDeletePopupComponent} from './factor-delete-dialog.component';
import {FactorReportComponent} from './factor-report.component';
import {FactorReportAggregateComponent} from './factor-report-aggregate.component';

@Injectable({ providedIn: 'root' })
export class FactorResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,desc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
        };
    }
}

export const factorRoute: Routes = [
    {
        path: '',
        component: FactorComponent,
        resolve: {
            'pagingParams': FactorResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_FACTOR'],
            pageTitle: 'niopdcgatewayApp.factor.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: ':factorId/report',
        component: FactorReportComponent,
        resolve: {
            'pagingParams': FactorResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_FACTOR_REPORT'],
            pageTitle: 'niopdcgatewayApp.factor.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: ':factorId/report-aggregate',
        component: FactorReportAggregateComponent,
        resolve: {
            'pagingParams': FactorResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_FACTOR_REPORT_AGGREGATE'],
            pageTitle: 'niopdcgatewayApp.factor.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const factorPopupRoute: Routes = [
    {
        path: 'new',
        component: FactorPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_FACTOR'],
            pageTitle: 'niopdcgatewayApp.factor.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit',
        component: FactorPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_FACTOR'],
            pageTitle: 'niopdcgatewayApp.factor.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: FactorDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_FACTOR'],
            pageTitle: 'niopdcgatewayApp.factor.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:view',
        component: FactorPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_FACTOR'],
            pageTitle: 'niopdcgatewayApp.factor.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
