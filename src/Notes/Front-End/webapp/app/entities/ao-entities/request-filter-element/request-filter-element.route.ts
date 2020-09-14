import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../../shared/index';
import {JhiPaginationUtil} from 'ng-jhipster';

import {RequestFilterElementComponent} from './request-filter-element.component';
import {RequestFilterElementPopupComponent} from './request-filter-element-dialog.component';
import {RequestFilterElementDeletePopupComponent} from './request-filter-element-delete-dialog.component';
import {RequestFilterElementSendPopupComponent} from './request-filter-element-send-dialog.component';
import {RequestFilterElementConfirmPopupComponent} from './request-filter-element-confirm-dialog.component';
import {RequestFilterElementReportComponent} from './request-filter-element-report.component';

@Injectable({ providedIn: 'root' })
export class RequestFilterElementResolvePagingParams implements Resolve<any> {

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

export const requestFilterElementRoute: Routes = [
    {
        path: '',
        component: RequestFilterElementComponent,
        resolve: {
            'pagingParams': RequestFilterElementResolvePagingParams

        },
        data: {
            authorities: [
                'ROLE_ADMIN',
                'LIST_DRAFT_REQUEST_FILTER_ELEMENT',
                'LIST_CONFIRM_REQUEST_FILTER_ELEMENT',
                'LIST_SEND_REQUEST_FILTER_ELEMENT',
                'LIST_RESPONSE_DRAFT_REQUEST_FILTER_ELEMENT',
                'LIST_RESPONSE_CONFIRM_REQUEST_FILTER_ELEMENT',
                'LIST_RESPONSE_SEND_REQUEST_FILTER_ELEMENT'
            ],
            pageTitle: 'niopdcgatewayApp.requestFilterElement.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const requestFilterElementPopupRoute: Routes = [
    {
        path: 'new',
        component: RequestFilterElementPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_REQUEST_FILTER_ELEMENT'],
            pageTitle: 'niopdcgatewayApp.requestFilterElement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit',
        component: RequestFilterElementPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_REQUEST_FILTER_ELEMENT'],
            pageTitle: 'niopdcgatewayApp.requestFilterElement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: RequestFilterElementDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_REQUEST_FILTER_ELEMENT'],
            pageTitle: 'niopdcgatewayApp.requestFilterElement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }, {
        path: ':id/send',
        component: RequestFilterElementSendPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'SEND_REQUEST_FILTER_ELEMENT'],
            pageTitle: 'niopdcgatewayApp.requestFilterElement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }, {
        path: ':id/confirm',
        component: RequestFilterElementConfirmPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CONFIRM_REQUEST_FILTER_ELEMENT'],
            pageTitle: 'niopdcgatewayApp.requestFilterElement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/report',
        component: RequestFilterElementReportComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'REPORT_REQUEST_FILTER_ELEMENT'],
            pageTitle: 'niopdcgatewayApp.requestFilterElement.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/:view',
        component: RequestFilterElementPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_REQUEST_FILTER_ELEMENT'],
            pageTitle: 'niopdcgatewayApp.requestFilterElement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
