import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';
import {JhiPaginationUtil} from 'ng-jhipster';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {PaymentComponent} from './payment.component';
import {PaymentDeletePopupComponent} from './payment-delete-dialog.component';
import {PaymentInquiryComponent} from './payment-inquiry.component';

@Injectable({ providedIn: 'root' })
export class PaymentResolvePagingParams implements Resolve<any> {

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

export const paymentRoute: Routes = [
    {
        path: '',
        component: PaymentComponent,
        resolve: {
            'pagingParams': PaymentResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_PAYMENT'],
            pageTitle: 'niopdcgatewayApp.payment.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'inquiry',
        component: PaymentInquiryComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'INQUIRY_PAYMENT'],
            pageTitle: 'niopdcgatewayApp.paymentInquiryRequestDTO.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'inquiry/:id/view',
        component: PaymentInquiryComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_PAYMENT'],
            pageTitle: 'niopdcgatewayApp.payment.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const paymentPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: PaymentDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_PAYMENT'],
            pageTitle: 'niopdcgatewayApp.payment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
