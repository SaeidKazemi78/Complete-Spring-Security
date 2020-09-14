import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {CleaningReportOilTankComponent} from './cleaning-report-oil-tank.component';
import {CleaningReportOilTankPopupComponent} from './cleaning-report-oil-tank-dialog.component';
import {CleaningReportOilTankDeletePopupComponent} from './cleaning-report-oil-tank-delete-dialog.component';
import {CleaningReportOilTankConfirmPopupComponent} from './cleaning-report-oil-tank-confirm-dialog.component';
import {CleaningReportOilTankSendPopupComponent} from './cleaning-report-oil-tank-send-dialog.component';
import {CleaningReportOilTankPrintComponent} from './cleaning-report-oil-tank-print.component';

@Injectable({ providedIn: 'root' })
export class CleaningReportOilTankResolvePagingParams implements Resolve<any> {

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

export const cleaningReportOilTankRoute: Routes = [
    {
        path: '',
        component: CleaningReportOilTankComponent,
        resolve: {
            'pagingParams': CleaningReportOilTankResolvePagingParams
        },
        data: {
            authorities: [
                'ROLE_ADMIN',
                'LIST_DRAFT_CLEANING_REPORT_OIL_TANK',
                'LIST_CONFIRM_CLEANING_REPORT_OIL_TANK',
                'LIST_SEND_CLEANING_REPORT_OIL_TANK',
                'LIST_VIEW_CLEANING_REPORT_OIL_TANK'
            ],
            pageTitle: 'niopdcgatewayApp.cleaningReportOilTank.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'print/:id',
        component: CleaningReportOilTankPrintComponent,
        resolve: {
            'pagingParams': CleaningReportOilTankResolvePagingParams
        },
        data: {
            authorities: [
                'ROLE_ADMIN',
                'LIST_DRAFT_CLEANING_REPORT_OIL_TANK',
                'LIST_CONFIRM_CLEANING_REPORT_OIL_TANK',
                'LIST_SEND_CLEANING_REPORT_OIL_TANK',
                'LIST_VIEW_CLEANING_REPORT_OIL_TANK'
            ],
            pageTitle: 'niopdcgatewayApp.cleaningReportOilTank.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cleaningReportOilTankPopupRoute: Routes = [
    {
        path: 'new',
        component: CleaningReportOilTankPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_CLEANING_REPORT_OIL_TANK'],
            pageTitle: 'niopdcgatewayApp.cleaningReportOilTank.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit',
        component: CleaningReportOilTankPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_CLEANING_REPORT_OIL_TANK'],
            pageTitle: 'niopdcgatewayApp.cleaningReportOilTank.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: CleaningReportOilTankDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_CLEANING_REPORT_OIL_TANK'],
            pageTitle: 'niopdcgatewayApp.cleaningReportOilTank.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }, {
        path: ':id/send',
        component: CleaningReportOilTankSendPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'SEND_CLEANING_REPORT_OIL_TANK'],
            pageTitle: 'niopdcgatewayApp.cleaningReportOilTank.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }, {
        path: ':id/confirm',
        component: CleaningReportOilTankConfirmPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CONFIRM_CLEANING_REPORT_OIL_TANK'],
            pageTitle: 'niopdcgatewayApp.cleaningReportOilTank.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:view',
        component: CleaningReportOilTankPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_CLEANING_REPORT_OIL_TANK'],
            pageTitle: 'niopdcgatewayApp.cleaningReportOilTank.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
