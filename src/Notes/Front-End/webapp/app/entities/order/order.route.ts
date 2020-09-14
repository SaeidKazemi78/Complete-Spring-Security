import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';
import {JhiPaginationUtil} from 'ng-jhipster';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {OrderComponent} from './order.component';
import {OrderDialogComponent} from './order-dialog.component';
import {OrderDeletePopupComponent} from './order-delete-dialog.component';
import {OrderCreditNotDepositedComponent} from './order-credit-not-deposited-component';
import {OrderConfirmPopupComponent} from './order-confirm-dialog.component';
import {ConnectDepotComponent} from './connect-depot.component';
import {OrderReportComponent} from './order-report.component';
import {OrderRevocationPopupComponent} from './order-revocation-dialog.component';
import {OrderRevertConfirmPopupComponent} from './order-revert-confirm-dialog.component';
import {OrderInvoicePopupComponent} from './order-invoice-dialog.component';
import {shiftWorkOpenClosePopupRoute} from 'app/entities/shift-work';
import {OrderConfirmAllPopupComponent} from "app/entities/order/order-confirm-all-dialog.component";
import {AirplaneReportComponent} from "app/entities/order/airplane-report.component";

@Injectable({providedIn: 'root'})
export class OrderResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const size = route.queryParams['size'] ? route.queryParams['size'] : ITEMS_PER_PAGE;
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'registerDate,desc';
        return {
            page: this.paginationUtil.parsePage(page),
            size: this.paginationUtil.parsePage(size),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
        };
    }
}

export const orderRoute: Routes = [
    {
        path: 'credit-not-deposited',
        component: OrderCreditNotDepositedComponent,
        resolve: {
            'pagingParams': OrderResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_CREDIT_NOT_DEPOSITED_ORDER'],
            pageTitle: 'niopdcgatewayApp.order.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'credit-not-deposited/payment',
        component: OrderCreditNotDepositedComponent,
        resolve: {
            'pagingParams': OrderResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_ORDER'],
            pageTitle: 'niopdcgatewayApp.order.home.title',
            isPayment: true
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: '',
        component: OrderComponent,
        resolve: {
            'pagingParams': OrderResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_ORDER', 'LIST_ORDER_AIRPLANE', 'LIST_ORDER_REFUEL_CENTER'],
            pageTitle: 'niopdcgatewayApp.order.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: OrderDialogComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_ORDER', 'CREATE_ORDER_AIRPLANE',
                'CREATE_ORDER_REFUEL_CENTER'],
            pageTitle: 'niopdcgatewayApp.order.home.title'
        },
        canActivate: [UserRouteAccessService],
        children: [
            ...shiftWorkOpenClosePopupRoute,
        ]
    },
    {
        path: ':id/edit',
        component: OrderDialogComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_ORDER'],
            pageTitle: 'niopdcgatewayApp.order.home.title'
        },
        canActivate: [UserRouteAccessService],
        children: [
            {
                path: ':id/delete',
                component: OrderDeletePopupComponent,
                data: {
                    authorities: ['ROLE_ADMIN', 'DELETE_ORDER'],
                    pageTitle: 'niopdcgatewayApp.order.home.title'
                },
                canActivate: [UserRouteAccessService],
                outlet: 'popup'
            }, ...shiftWorkOpenClosePopupRoute,
        ]
    },
    {
        path: ':id/edit/:activeIndex',
        component: OrderDialogComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_ORDER'],
            pageTitle: 'niopdcgatewayApp.order.home.title'
        },
        canActivate: [UserRouteAccessService],
        children: [
            {
                path: ':id/delete',
                component: OrderDeletePopupComponent,
                data: {
                    authorities: ['ROLE_ADMIN', 'DELETE_ORDER'],
                    pageTitle: 'niopdcgatewayApp.order.home.title'
                },
                canActivate: [UserRouteAccessService],
                outlet: 'popup'
            }, ...shiftWorkOpenClosePopupRoute,
        ]
    },
    {
        path: 'credit-not-deposited',
        component: OrderCreditNotDepositedComponent,
        resolve: {
            'pagingParams': OrderResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_ORDER'],
            pageTitle: 'niopdcgatewayApp.order.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'connect-depot',
        component: ConnectDepotComponent,
        data: {
            // todo add auth
            authorities: ['ROLE_ADMIN', 'CONNECT_DEPOT_DOWNLOAD', 'CONNECT_DEPOT_UPLOAD'],
            pageTitle: 'niopdcgatewayApp.order.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/print',
        component: OrderReportComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'PRINT_ORDER', 'PRINT_AGAIN_ORDER'],
            pageTitle: 'niopdcgatewayApp.order.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/print-airplane',
        component: AirplaneReportComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'PRINT_AIRPLANE'],
            pageTitle: 'niopdcgatewayApp.order.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const orderPopupRoute: Routes = [
    {
        path: 'invoice',
        component: OrderInvoicePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'GET_INVOICE'],
            pageTitle: 'niopdcgatewayApp.order.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'confirm/:id',
        component: OrderConfirmPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CONFIRM_ORDER'],
            pageTitle: 'niopdcgatewayApp.order.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'confirm-all',
        component: OrderConfirmAllPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CONFIRM_FUEL_RECEIPT'],
            pageTitle: 'niopdcgatewayApp.order.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }, {
        path: 'revert-confirm/:id',
        component: OrderRevertConfirmPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CONFIRM_ORDER'],
            pageTitle: 'niopdcgatewayApp.order.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: OrderDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_ORDER', 'DELETE_FUEL_RECEIPT'],
            pageTitle: 'niopdcgatewayApp.order.home.title',
            mode: 'order'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/revocation',
        component: OrderRevocationPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'REVOCATION_ORDER','REVOCATION_FUEL_RECEIPT'],
            pageTitle: 'niopdcgatewayApp.order.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
