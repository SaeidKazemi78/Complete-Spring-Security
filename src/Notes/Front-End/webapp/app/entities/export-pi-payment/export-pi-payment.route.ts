import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {ExportPiPaymentComponent} from './export-pi-payment.component';
import {ExportPiPaymentPopupComponent} from './export-pi-payment-dialog.component';
import {ExportPiPaymentDeletePopupComponent} from './export-pi-payment-delete-dialog.component';
import {ExportPiEPaymentComponent} from 'app/entities/export-pi-payment/export-pi-e-payment.component';

@Injectable({providedIn: 'root'})
export class ExportPiPaymentResolvePagingParams implements Resolve<any> {

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

export const exportPiPaymentRoute: Routes = [
    {
        path: '',
        component: ExportPiPaymentComponent,
        resolve: {
            'pagingParams': ExportPiPaymentResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_EXPORT_PI_PAYMENT'],
            pageTitle: 'niopdcgatewayApp.exportPiPayment.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':payId',
        component: ExportPiEPaymentComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'PAY_EXPORT_PI_E_PAYMENT'],
            pageTitle: 'niopdcgatewayApp.exportPiPayment.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const exportPiPaymentPopupRoute: Routes = [
    {
        path: 'new/:exportPiId',
        component: ExportPiPaymentPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_EXPORT_PI_PAYMENT'],
            pageTitle: 'niopdcgatewayApp.exportPiPayment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit',
        component: ExportPiPaymentPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_EXPORT_PI_PAYMENT'],
            pageTitle: 'niopdcgatewayApp.exportPiPayment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: ExportPiPaymentDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_EXPORT_PI_PAYMENT'],
            pageTitle: 'niopdcgatewayApp.exportPiPayment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:view',
        component: ExportPiPaymentPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_EXPORT_PI_PAYMENT'],
            pageTitle: 'niopdcgatewayApp.exportPiPayment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
