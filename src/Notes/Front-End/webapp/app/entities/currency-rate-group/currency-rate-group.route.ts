import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';
import {JhiPaginationUtil} from 'ng-jhipster';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {CurrencyRateGroupComponent} from './currency-rate-group.component';
import {CurrencyRateGroupPopupComponent} from './currency-rate-group-dialog.component';
import {CurrencyRateGroupDeletePopupComponent} from './currency-rate-group-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class CurrencyRateGroupResolvePagingParams implements Resolve<any> {

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

export const currencyRateGroupRoute: Routes = [
    {
        path: '',
        component: CurrencyRateGroupComponent,
        resolve: {
            'pagingParams': CurrencyRateGroupResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_CURRENCY_RATE_GROUP'],
            pageTitle: 'niopdcgatewayApp.currencyRateGroup.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const currencyRateGroupPopupRoute: Routes = [
    {
        path: 'new',
        component: CurrencyRateGroupPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_CURRENCY_RATE_GROUP'],
            pageTitle: 'niopdcgatewayApp.currencyRateGroup.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit',
        component: CurrencyRateGroupPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_CURRENCY_RATE_GROUP'],
            pageTitle: 'niopdcgatewayApp.currencyRateGroup.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: CurrencyRateGroupDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_CURRENCY_RATE_GROUP'],
            pageTitle: 'niopdcgatewayApp.currencyRateGroup.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:view',
        component: CurrencyRateGroupPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_CURRENCY_RATE_GROUP'],
            pageTitle: 'niopdcgatewayApp.currencyRateGroup.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
