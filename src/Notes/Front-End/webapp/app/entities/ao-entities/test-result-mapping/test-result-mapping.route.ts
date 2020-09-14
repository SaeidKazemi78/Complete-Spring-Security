import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {TestResultMappingComponent} from './test-result-mapping.component';
import {TestResultMappingPopupComponent} from './test-result-mapping-dialog.component';
import {TestResultMappingDeletePopupComponent} from './test-result-mapping-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class TestResultMappingResolvePagingParams implements Resolve<any> {

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

export const testResultMappingRoute: Routes = [
    {
        path: 'base-test-result/:baseTestResultId/test-result-mapping',
        component: TestResultMappingComponent,
        resolve: {
            'pagingParams': TestResultMappingResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_TEST_RESULT_MAPPING'],
            pageTitle: 'niopdcgatewayApp.testResultMapping.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const testResultMappingPopupRoute: Routes = [
    {
        path: 'test-result-mapping-new/:baseTestResultId',
        component: TestResultMappingPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_TEST_RESULT_MAPPING'],
            pageTitle: 'niopdcgatewayApp.testResultMapping.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'test-result-mapping/:id/edit',
        component: TestResultMappingPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_TEST_RESULT_MAPPING'],
            pageTitle: 'niopdcgatewayApp.testResultMapping.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'test-result-mapping/:id/delete',
        component: TestResultMappingDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_TEST_RESULT_MAPPING'],
            pageTitle: 'niopdcgatewayApp.testResultMapping.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'test-result-mapping/:id/:view',
        component: TestResultMappingPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_TEST_RESULT_MAPPING'],
            pageTitle: 'niopdcgatewayApp.testResultMapping.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
