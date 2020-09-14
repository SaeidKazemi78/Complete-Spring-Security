import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';
import {JhiPaginationUtil} from 'ng-jhipster';

import {UserRouteAccessService} from '../../../shared/index';
import {ChangeRequestElementComponent} from './change-request-element.component';
import {ChangeRequestElementDetailComponent} from './change-request-element-detail.component';
import {ChangeRequestElementPopupComponent} from './change-request-element-dialog.component';
import {ChangeRequestElementDeletePopupComponent} from './change-request-element-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class ChangeRequestElementResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
        };
    }
}

export const changeRequestElementRoute: Routes = [
    {
        path: 'change-request-element',
        component: ChangeRequestElementComponent,
        resolve: {
            'pagingParams': ChangeRequestElementResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'niopdcgatewayApp.changeRequestElement.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'change-request-element/:id',
        component: ChangeRequestElementDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'niopdcgatewayApp.changeRequestElement.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const changeRequestElementPopupRoute: Routes = [
    {
        path: 'change-request-element-new',
        component: ChangeRequestElementPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'niopdcgatewayApp.changeRequestElement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'change-request-element/:id/edit',
        component: ChangeRequestElementPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'niopdcgatewayApp.changeRequestElement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'change-request-element/:id/delete',
        component: ChangeRequestElementDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'niopdcgatewayApp.changeRequestElement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
