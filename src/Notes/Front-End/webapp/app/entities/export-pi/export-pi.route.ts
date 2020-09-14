import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {ExportPiComponent} from './export-pi.component';
import {ExportPiPopupComponent} from './export-pi-dialog.component';
import {ExportPiDeletePopupComponent} from './export-pi-delete-dialog.component';

@Injectable({providedIn: 'root'})
export class ExportPiResolvePagingParams implements Resolve<any> {

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

export const exportPiRoute: Routes = [
    {
        path: '',
        component: ExportPiComponent,
        resolve: {
            'pagingParams': ExportPiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_EXPORT_PI'],
            pageTitle: 'niopdcgatewayApp.exportPi.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const exportPiPopupRoute: Routes = [
    {
        path: 'new/:exportLetterId',
        component: ExportPiPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_EXPORT_PI'],
            pageTitle: 'niopdcgatewayApp.exportPi.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit',
        component: ExportPiPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_EXPORT_PI'],
            pageTitle: 'niopdcgatewayApp.exportPi.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: ExportPiDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_EXPORT_PI'],
            pageTitle: 'niopdcgatewayApp.exportPi.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:view',
        component: ExportPiPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_EXPORT_PI'],
            pageTitle: 'niopdcgatewayApp.exportPi.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
