import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import { ContainerComponent } from './container.component';
import { ContainerPopupComponent } from './container-dialog.component';
import { ContainerDeletePopupComponent } from './container-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class ContainerResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const size = route.queryParams['size'] ? route.queryParams['size'] : ITEMS_PER_PAGE;
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'title,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            size: this.paginationUtil.parsePage(size),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
        };
    }
}

export const containerRoute: Routes = [
    {
        path: '',
        component: ContainerComponent,
        resolve: {
            'pagingParams': ContainerResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_CONTAINER'],
            pageTitle: 'niopdcgatewayApp.container.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const containerPopupRoute: Routes = [
    {
        path: 'new',
        component: ContainerPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_CONTAINER'],
            pageTitle: 'niopdcgatewayApp.container.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit',
        component: ContainerPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_CONTAINER'],
            pageTitle: 'niopdcgatewayApp.container.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: ContainerDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_CONTAINER'],
            pageTitle: 'niopdcgatewayApp.container.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }, {
        path: ':id/:view',
        component: ContainerPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_CONTAINER'],
            pageTitle: 'niopdcgatewayApp.container.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
