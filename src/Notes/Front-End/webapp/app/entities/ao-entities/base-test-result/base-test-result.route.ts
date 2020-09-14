import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../../shared/index';
import {JhiPaginationUtil} from 'ng-jhipster';

import {BaseTestResultComponent} from './base-test-result.component';
import {BaseTestResultPopupComponent} from './base-test-result-dialog.component';
import {BaseTestResultDeletePopupComponent} from './base-test-result-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class BaseTestResultResolvePagingParams implements Resolve<any> {

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

export const baseTestResultRoute: Routes = [
    {
        path: '',
        component: BaseTestResultComponent,
        resolve: {
            'pagingParams': BaseTestResultResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_BASE_TEST_RESULT'],
            pageTitle: 'niopdcgatewayApp.baseTestResult.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const baseTestResultPopupRoute: Routes = [
    {
        path: 'new/:parentBaseTestResultId',
        component: BaseTestResultPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_BASE_TEST_RESULT'],
            pageTitle: 'niopdcgatewayApp.baseTestResult.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit',
        component: BaseTestResultPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_BASE_TEST_RESULT'],
            pageTitle: 'niopdcgatewayApp.baseTestResult.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: BaseTestResultDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_BASE_TEST_RESULT'],
            pageTitle: 'niopdcgatewayApp.baseTestResult.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:view',
        component: BaseTestResultPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_BASE_TEST_RESULT'],
            pageTitle: 'niopdcgatewayApp.baseTestResult.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
