import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';
import {JhiPaginationUtil} from 'ng-jhipster';

import {UserRouteAccessService} from '../../../shared/index';
import {LastChangeDateElementComponent} from './last-change-date-element.component';
import {LastChangeDateElementDetailComponent} from './last-change-date-element-detail.component';
import {LastChangeDateElementPopupComponent} from './last-change-date-element-dialog.component';
import {LastChangeDateElementDeletePopupComponent} from './last-change-date-element-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class LastChangeDateElementResolvePagingParams implements Resolve<any> {

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

export const lastChangeDateElementRoute: Routes = [
    {
        path: 'last-change-date-element',
        component: LastChangeDateElementComponent,
        resolve: {
            'pagingParams': LastChangeDateElementResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'niopdcgatewayApp.lastChangeDateElement.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'last-change-date-element/:id',
        component: LastChangeDateElementDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'niopdcgatewayApp.lastChangeDateElement.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const lastChangeDateElementPopupRoute: Routes = [
    {
        path: 'last-change-date-element-new',
        component: LastChangeDateElementPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'niopdcgatewayApp.lastChangeDateElement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'last-change-date-element/:id/edit',
        component: LastChangeDateElementPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'niopdcgatewayApp.lastChangeDateElement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'last-change-date-element/:id/delete',
        component: LastChangeDateElementDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'niopdcgatewayApp.lastChangeDateElement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
