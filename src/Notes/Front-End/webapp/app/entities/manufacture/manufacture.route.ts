import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';
import {JhiPaginationUtil} from 'ng-jhipster';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {ManufactureComponent} from './manufacture.component';
import {ManufacturePopupComponent} from './manufacture-dialog.component';
import {ManufactureDeletePopupComponent} from './manufacture-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class ManufactureResolvePagingParams implements Resolve<any> {

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

export const manufactureRoute: Routes = [
    {
        path: '',
        component: ManufactureComponent,
        resolve: {
            'pagingParams': ManufactureResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_MANUFACTURE'],
            pageTitle: 'niopdcgatewayApp.manufacture.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const manufacturePopupRoute: Routes = [
    {
        path: 'new',
        component: ManufacturePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_MANUFACTURE'],
            pageTitle: 'niopdcgatewayApp.manufacture.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit',
        component: ManufacturePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_MANUFACTURE'],
            pageTitle: 'niopdcgatewayApp.manufacture.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: ManufactureDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_MANUFACTURE'],
            pageTitle: 'niopdcgatewayApp.manufacture.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:view',
        component: ManufacturePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_MANUFACTURE'],
            pageTitle: 'niopdcgatewayApp.manufacture.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
