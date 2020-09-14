import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {MenuComponent} from './menu.component';
import {MenuPopupComponent} from './menu-dialog.component';
import {MenuDeletePopupComponent} from './menu-delete-dialog.component';

@Injectable({providedIn: 'root'})
export class MenuResolvePagingParams implements Resolve<any> {

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

export const menuRoute: Routes = [
    {
        path: '',
        component: MenuComponent,
        resolve: {
            'pagingParams': MenuResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_MENU'],
            pageTitle: 'niopdcgatewayApp.menu.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':lvlOneId/lvl-two',
        loadChildren: '../menu/menu.module#NiopdcgatewayMenuModule'
    },
    {
        path: ':lvlOneId/lvl-two/:lvlTwoId/lvl-three',
        loadChildren: '../menu/menu.module#NiopdcgatewayMenuModule'
    },
];

export const menuPopupRoute: Routes = [
    {
        path: 'new/:lvl/:parentId',
        component: MenuPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_MENU'],
            pageTitle: 'niopdcgatewayApp.menu.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit',
        component: MenuPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_MENU'],
            pageTitle: 'niopdcgatewayApp.menu.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: MenuDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_MENU'],
            pageTitle: 'niopdcgatewayApp.menu.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:view',
        component: MenuPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_MENU'],
            pageTitle: 'niopdcgatewayApp.menu.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
