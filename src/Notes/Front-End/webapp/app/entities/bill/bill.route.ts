import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {BillComponent} from './bill.component';
import {BillPopupComponent} from './bill-dialog.component';
import {BillDeletePopupComponent} from './bill-delete-dialog.component';
import {BillReportComponent} from './bill-report.component';

@Injectable({ providedIn: 'root' })
export class BillResolvePagingParams implements Resolve<any> {

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

export const billRoute: Routes = [
    {
        path: '',
        component: BillComponent,
        resolve: {
            'pagingParams': BillResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_BILL'],
            pageTitle: 'niopdcgatewayApp.bill.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: ':billId/bill-report',
        component: BillReportComponent,
        resolve: {
            'pagingParams': BillResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_BILL_REPORT'],
            pageTitle: 'niopdcgatewayApp.bill.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const billPopupRoute: Routes = [
    {
        path: 'new',
        component: BillPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_BILL'],
            pageTitle: 'niopdcgatewayApp.bill.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit',
        component: BillPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_BILL'],
            pageTitle: 'niopdcgatewayApp.bill.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: BillDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_BILL'],
            pageTitle: 'niopdcgatewayApp.bill.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:view',
        component: BillPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_BILL'],
            pageTitle: 'niopdcgatewayApp.bill.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
