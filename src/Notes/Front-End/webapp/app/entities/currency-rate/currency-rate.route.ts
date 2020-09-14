import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';
import {JhiPaginationUtil} from 'ng-jhipster';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {CurrencyRateComponent} from './currency-rate.component';
import {CurrencyRatePopupComponent} from './currency-rate-dialog.component';
import {CurrencyRateDeletePopupComponent} from './currency-rate-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class CurrencyRateResolvePagingParams implements Resolve<any> {

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

export const currencyRateRoute: Routes = [
    {
        path: '',
        component: CurrencyRateComponent,
        resolve: {
            'pagingParams': CurrencyRateResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_CURRENCY_RATE'],
            pageTitle: 'niopdcgatewayApp.currencyRate.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const currencyRatePopupRoute: Routes = [
    {
        path: 'new/:currencyId',
        component: CurrencyRatePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_CURRENCY_RATE'],
            pageTitle: 'niopdcgatewayApp.currencyRate.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit',
        component: CurrencyRatePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_CURRENCY_RATE'],
            pageTitle: 'niopdcgatewayApp.currencyRate.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: CurrencyRateDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_CURRENCY_RATE'],
            pageTitle: 'niopdcgatewayApp.currencyRate.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:view',
        component: CurrencyRatePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_CURRENCY_RATE'],
            pageTitle: 'niopdcgatewayApp.currencyRate.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
