import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {RateDifferenceComponent} from './rate-difference.component';
import {RateDifferenceDeletePopupComponent} from './rate-difference-delete-dialog.component';
import {RateDifferencePaymentComponent} from 'app/entities/rate-difference/rate-difference-payment.component';


@Injectable({providedIn: 'root'})
export class RateDifferenceResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const size = route.queryParams['size'] ? route.queryParams['size'] : ITEMS_PER_PAGE;
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            size: this.paginationUtil.parsePage(size),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
        };
    }
}

export const rateDifferenceRoute: Routes = [
    {
        path: '',
        component: RateDifferenceComponent,
        resolve: {
            'pagingParams': RateDifferenceResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_RATE_DIFFERENCE'],
            pageTitle: 'niopdcgatewayApp.rateDifference.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/payment/:payId',
        component: RateDifferencePaymentComponent,
        resolve: {
            'pagingParams': RateDifferenceResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'PAY_RATE_DIFFERENCE'],
            pageTitle: 'niopdcgatewayApp.rateDifference.home.titlePayment'
        },
        canActivate: [UserRouteAccessService]
    }
];
export const rateDifferencePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: RateDifferenceDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_RATE_DIFFERENCE'],
            pageTitle: 'niopdcgatewayApp.rateDifference.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
