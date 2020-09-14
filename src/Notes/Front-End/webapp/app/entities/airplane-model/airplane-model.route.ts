import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { AirplaneModelComponent } from './airplane-model.component';
import { AirplaneModelDetailComponent } from './airplane-model-detail.component';
import { AirplaneModelPopupComponent } from './airplane-model-dialog.component';
import { AirplaneModelDeletePopupComponent } from './airplane-model-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class AirplaneModelResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,desc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const airplaneModelRoute: Routes = [
    {
        path: 'airplane-model',
        component: AirplaneModelComponent,
        resolve: {
            'pagingParams': AirplaneModelResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'niopdcgatewayApp.airplaneModel.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'airplane-model/:id',
        component: AirplaneModelDetailComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'niopdcgatewayApp.airplaneModel.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const airplaneModelPopupRoute: Routes = [
    {
        path: 'airplane-model-new',
        component: AirplaneModelPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'niopdcgatewayApp.airplaneModel.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'airplane-model/:id/edit',
        component: AirplaneModelPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'niopdcgatewayApp.airplaneModel.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'airplane-model/:id/delete',
        component: AirplaneModelDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'niopdcgatewayApp.airplaneModel.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
