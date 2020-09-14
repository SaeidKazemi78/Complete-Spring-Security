import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { ITEMS_PER_PAGE, UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CarInfoComponent } from './car-info.component';
import { CarInfoPopupComponent } from './car-info-dialog.component';
import { CarInfoDeletePopupComponent } from './car-info-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class CarInfoResolvePagingParams implements Resolve<any> {

        constructor(private paginationUtil: JhiPaginationUtil) {}

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

export const carInfoRoute: Routes = [
    {
        path: '',
        component: CarInfoComponent,
        resolve: {
            'pagingParams': CarInfoResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_CAR_INFO'],
            pageTitle: 'niopdcgatewayApp.carInfo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const carInfoPopupRoute: Routes = [
  {
    path: 'new/:carId',
    component: CarInfoPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'CREATE_CAR_INFO'],
        pageTitle: 'niopdcgatewayApp.carInfo.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/edit',
    component: CarInfoPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'EDIT_CAR_INFO'],
        pageTitle: 'niopdcgatewayApp.carInfo.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/delete',
    component: CarInfoDeletePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'DELETE_CAR_INFO'],
        pageTitle: 'niopdcgatewayApp.carInfo.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
      path: ':id/:view',
      component: CarInfoPopupComponent,
      data: {
          authorities: ['ROLE_ADMIN', 'VIEW_CAR_INFO'],
          pageTitle: 'niopdcgatewayApp.carInfo.home.title'
      },
      canActivate: [UserRouteAccessService],
      outlet: 'popup'
  }
];
