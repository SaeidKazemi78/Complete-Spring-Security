import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {ChangeFilterElementComponent} from './change-filter-element.component';
import {ChangeFilterElementPopupComponent} from './change-filter-element-dialog.component';
import {ChangeFilterElementDeletePopupComponent} from './change-filter-element-delete-dialog.component';
import {ChangeFilterElementConfirmPopupComponent} from './change-filter-element-confirm-dialog.component';

@Injectable({ providedIn: 'root' })
export class ChangeFilterElementResolvePagingParams implements Resolve<any> {

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

export const changeFilterElementRoute: Routes = [
    {
        path: 'request-filter-element/:requestFilterElementId/change-filter-element',
        component: ChangeFilterElementComponent,
        resolve: {
            'pagingParams': ChangeFilterElementResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_CHANGE_FILTER_ELEMENT'],
            pageTitle: 'niopdcgatewayApp.changeFilterElement.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const changeFilterElementPopupRoute: Routes = [
    {
        path: 'change-filter-element-new/:requestFilterElementId/:mode',
        component: ChangeFilterElementPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_CHANGE_FILTER_ELEMENT'],
            pageTitle: 'niopdcgatewayApp.changeFilterElement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'change-filter-element/:id/edit',
        component: ChangeFilterElementPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_CHANGE_FILTER_ELEMENT'],
            pageTitle: 'niopdcgatewayApp.changeFilterElement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'change-filter-element/:id/delete',
        component: ChangeFilterElementDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_CHANGE_FILTER_ELEMENT'],
            pageTitle: 'niopdcgatewayApp.changeFilterElement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'change-filter-element/:id/confirm',
        component: ChangeFilterElementConfirmPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CONFIRM_CHANGE_FILTER_ELEMENT'],
            pageTitle: 'niopdcgatewayApp.changeFilterElement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'change-filter-element/:id/:view',
        component: ChangeFilterElementPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_CHANGE_FILTER_ELEMENT'],
            pageTitle: 'niopdcgatewayApp.changeFilterElement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
