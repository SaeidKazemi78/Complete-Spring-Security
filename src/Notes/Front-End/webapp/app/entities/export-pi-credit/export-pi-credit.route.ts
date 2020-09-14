import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {ExportPiCreditComponent} from './export-pi-credit.component';
import {ExportPiCreditPopupComponent} from './export-pi-credit-dialog.component';
import {ExportPiCreditDeletePopupComponent} from './export-pi-credit-delete-dialog.component';

@Injectable({providedIn: 'root'})
export class ExportPiCreditResolvePagingParams implements Resolve<any> {

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

export const exportPiCreditRoute: Routes = [
    {
        path: '',
        component: ExportPiCreditComponent,
        resolve: {
            'pagingParams': ExportPiCreditResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_EXPORT_PI_CREDIT'],
            pageTitle: 'niopdcgatewayApp.exportPiCredit.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const exportPiCreditPopupRoute: Routes = [
    {
        path: 'new/:exportPiId',
        component: ExportPiCreditPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_EXPORT_PI_CREDIT'],
            pageTitle: 'niopdcgatewayApp.exportPiCredit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit',
        component: ExportPiCreditPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_EXPORT_PI_CREDIT'],
            pageTitle: 'niopdcgatewayApp.exportPiCredit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: ExportPiCreditDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_EXPORT_PI_CREDIT'],
            pageTitle: 'niopdcgatewayApp.exportPiCredit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:view',
        component: ExportPiCreditPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_EXPORT_PI_CREDIT'],
            pageTitle: 'niopdcgatewayApp.exportPiCredit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
