import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {RequestTestResultComponent} from './request-test-result.component';
import {RequestTestResultPopupComponent} from './request-test-result-dialog.component';
import {RequestTestResultDeletePopupComponent} from './request-test-result-delete-dialog.component';
import {RequestTestResultConfirmPopupComponent} from './request-test-result-confirm-dialog.component';
import {RequestTestResultSendPopupComponent} from './request-test-result-send-dialog.component';

@Injectable({ providedIn: 'root' })
export class RequestTestResultResolvePagingParams implements Resolve<any> {

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

export const requestTestResultRoute: Routes = [
    {
        path: '',
        component: RequestTestResultComponent,
        resolve: {
            'pagingParams': RequestTestResultResolvePagingParams
        },
        data: {
            authorities: [
                'ROLE_ADMIN',
                'LIST_DRAFT_REQUEST_TEST_RESULT',
                'LIST_CONFIRM_REQUEST_TEST_RESULT',
                'LIST_SEND_REQUEST_TEST_RESULT',
                'LIST_VIEW_REQUEST_TEST_RESULT'
            ],
            pageTitle: 'niopdcgatewayApp.requestTestResult.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const requestTestResultPopupRoute: Routes = [
    {
        path: 'new',
        component: RequestTestResultPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_REQUEST_TEST_RESULT'],
            pageTitle: 'niopdcgatewayApp.requestTestResult.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit',
        component: RequestTestResultPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_REQUEST_TEST_RESULT'],
            pageTitle: 'niopdcgatewayApp.requestTestResult.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: RequestTestResultDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_REQUEST_TEST_RESULT'],
            pageTitle: 'niopdcgatewayApp.requestTestResult.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }, {
        path: ':id/send',
        component: RequestTestResultSendPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'SEND_REQUEST_TEST_RESULT'],
            pageTitle: 'niopdcgatewayApp.requestTestResult.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }, {
        path: ':id/confirm',
        component: RequestTestResultConfirmPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CONFIRM_REQUEST_TEST_RESULT'],
            pageTitle: 'niopdcgatewayApp.requestTestResult.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:view',
        component: RequestTestResultPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_REQUEST_TEST_RESULT'],
            pageTitle: 'niopdcgatewayApp.requestTestResult.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
