import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {TestResultComponent} from './test-result.component';
import {TestResultPopupComponent} from './test-result-dialog.component';
import {TestResultDeletePopupComponent} from './test-result-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class TestResultResolvePagingParams implements Resolve<any> {

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

export const testResultRoute: Routes = [
    {
        path: 'test-result',
        component: TestResultComponent,
        resolve: {
            'pagingParams': TestResultResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_TEST_RESULT'],
            pageTitle: 'niopdcgatewayApp.testResult.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const testResultPopupRoute: Routes = [
    {
        path: 'test-result-new/:requestTestResultId/:mode',
        component: TestResultPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_TEST_RESULT'],
            pageTitle: 'niopdcgatewayApp.testResult.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'test-result/:id/edit',
        component: TestResultPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_TEST_RESULT'],
            pageTitle: 'niopdcgatewayApp.testResult.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'test-result/:id/delete',
        component: TestResultDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_TEST_RESULT'],
            pageTitle: 'niopdcgatewayApp.testResult.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'test-result/:id/:view',
        component: TestResultPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_TEST_RESULT'],
            pageTitle: 'niopdcgatewayApp.testResult.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
