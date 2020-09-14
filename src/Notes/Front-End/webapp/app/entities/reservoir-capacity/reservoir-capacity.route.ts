import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ReservoirCapacityComponent } from './reservoir-capacity.component';
import { ReservoirCapacityDetailComponent } from './reservoir-capacity-detail.component';
import { ReservoirCapacityPopupComponent } from './reservoir-capacity-dialog.component';
import { ReservoirCapacityDeletePopupComponent } from './reservoir-capacity-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class ReservoirCapacityResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

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

export const reservoirCapacityRoute: Routes = [
    {
        path: 'reservoir-capacity',
        component: ReservoirCapacityComponent,
        resolve: {
            'pagingParams': ReservoirCapacityResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'niopdcgatewayApp.reservoirCapacity.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'reservoir-capacity/:id',
        component: ReservoirCapacityDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'niopdcgatewayApp.reservoirCapacity.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const reservoirCapacityPopupRoute: Routes = [
    {
        path: 'reservoir-capacity-new',
        component: ReservoirCapacityPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'niopdcgatewayApp.reservoirCapacity.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'reservoir-capacity/:id/edit',
        component: ReservoirCapacityPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'niopdcgatewayApp.reservoirCapacity.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'reservoir-capacity/:id/delete',
        component: ReservoirCapacityDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'niopdcgatewayApp.reservoirCapacity.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
