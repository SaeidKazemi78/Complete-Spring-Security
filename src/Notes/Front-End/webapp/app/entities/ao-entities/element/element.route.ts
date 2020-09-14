import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../../shared/index';
import {JhiPaginationUtil} from 'ng-jhipster';

import {ElementComponent} from './element.component';
import {ElementPopupComponent} from './element-dialog.component';
import {ElementDeletePopupComponent} from './element-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class ElementResolvePagingParams implements Resolve<any> {

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

export const elementRoute: Routes = [
    {
        path: '',
        component: ElementComponent,
        resolve: {
            'pagingParams': ElementResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_ELEMENT'],
            pageTitle: 'niopdcgatewayApp.element.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const elementPopupRoute: Routes = [
    {
        path: 'new/:filterId',
        component: ElementPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_ELEMENT'],
            pageTitle: 'niopdcgatewayApp.element.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit',
        component: ElementPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_ELEMENT'],
            pageTitle: 'niopdcgatewayApp.element.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: ElementDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_ELEMENT'],
            pageTitle: 'niopdcgatewayApp.element.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:view',
        component: ElementPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_ELEMENT'],
            pageTitle: 'niopdcgatewayApp.element.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
