import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {ParentBaseTestResultComponent} from './parent-base-test-result.component';
import {ParentBaseTestResultPopupComponent} from './parent-base-test-result-dialog.component';
import {ParentBaseTestResultDeletePopupComponent} from './parent-base-test-result-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class ParentBaseTestResultResolvePagingParams implements Resolve<any> {

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

export const parentBaseTestResultRoute: Routes = [
    {
        path: '',
        component: ParentBaseTestResultComponent,
        resolve: {
            'pagingParams': ParentBaseTestResultResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_PARENT_BASE_TEST_RESULT'],
            pageTitle: 'niopdcgatewayApp.parentBaseTestResult.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':parentBaseTestResultId/base-test-result',
        loadChildren: '../base-test-result/base-test-result.module#NiopdcgatewayBaseTestResultModule'
    },
];

export const parentBaseTestResultPopupRoute: Routes = [
    {
        path: 'new',
        component: ParentBaseTestResultPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_PARENT_BASE_TEST_RESULT'],
            pageTitle: 'niopdcgatewayApp.parentBaseTestResult.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit',
        component: ParentBaseTestResultPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_PARENT_BASE_TEST_RESULT'],
            pageTitle: 'niopdcgatewayApp.parentBaseTestResult.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: ParentBaseTestResultDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_PARENT_BASE_TEST_RESULT'],
            pageTitle: 'niopdcgatewayApp.parentBaseTestResult.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:view',
        component: ParentBaseTestResultPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_PARENT_BASE_TEST_RESULT'],
            pageTitle: 'niopdcgatewayApp.parentBaseTestResult.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
