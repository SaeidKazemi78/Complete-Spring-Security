import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';
import {JhiPaginationUtil} from 'ng-jhipster';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {CurrencyComponent} from './currency.component';
import {CurrencyPopupComponent} from './currency-dialog.component';
import {CurrencyDeletePopupComponent} from './currency-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class CurrencyResolvePagingParams implements Resolve<any> {

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

export const currencyRoute: Routes = [
    {
        path: '',
        component: CurrencyComponent,
        resolve: {
            'pagingParams': CurrencyResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_CURRENCY'],
            pageTitle: 'niopdcgatewayApp.currency.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const currencyPopupRoute: Routes = [
    {
        path: 'new',
        component: CurrencyPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_CURRENCY'],
            pageTitle: 'niopdcgatewayApp.currency.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit',
        component: CurrencyPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_CURRENCY'],
            pageTitle: 'niopdcgatewayApp.currency.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: CurrencyDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_CURRENCY'],
            pageTitle: 'niopdcgatewayApp.currency.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:view',
        component: CurrencyPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_CURRENCY'],
            pageTitle: 'niopdcgatewayApp.currency.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
