import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {WayBillComponent} from './way-bill.component';
import {WayBillPopupComponent} from './way-bill-dialog.component';
import {WayBillDeletePopupComponent} from './way-bill-delete-dialog.component';
import {WayBillRcvPopupComponent} from './way-bill-rcv-dialog.component';
import {WayBillReportComponent} from './way-bill-report.component';
@Injectable({ providedIn: 'root' })
export class WayBillResolvePagingParams implements Resolve<any> {

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

export const wayBillRoute: Routes = [
    {
        path: '',
        component: WayBillComponent,
        resolve: {
            'pagingParams': WayBillResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_WAY_BILL'],
            pageTitle: 'niopdcgatewayApp.wayBill.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/report',
        component: WayBillReportComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'PRINT_WAY_BILL'],
            pageTitle: 'niopdcgatewayApp.wayBill.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const wayBillPopupRoute: Routes = [
    {
        path: 'order/:orderId',
        component: WayBillPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_WAY_BILL'],
            pageTitle: 'niopdcgatewayApp.wayBill.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'new/:dayDepotId/:mainDayDepotId/:mode',
        component: WayBillPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_WAY_BILL'],
            pageTitle: 'niopdcgatewayApp.wayBill.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },

    {
        path: 'rcv/:id',
        component: WayBillRcvPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DOWNLOAD_RCV'],
            pageTitle: 'niopdcgatewayApp.wayBill.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit/:mainDayDepotId',
        component: WayBillPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_WAY_BILL'],
            pageTitle: 'niopdcgatewayApp.wayBill.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: WayBillDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_WAY_BILL'],
            pageTitle: 'niopdcgatewayApp.wayBill.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:view/:mainDayDepotId',
        component: WayBillPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_WAY_BILL'],
            pageTitle: 'niopdcgatewayApp.wayBill.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
