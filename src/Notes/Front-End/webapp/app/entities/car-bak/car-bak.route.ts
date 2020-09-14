import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { ITEMS_PER_PAGE, UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CarBakComponent } from './car-bak.component';
import { CarBakPopupComponent } from './car-bak-dialog.component';
import { CarBakDeletePopupComponent } from './car-bak-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class CarBakResolvePagingParams implements Resolve<any> {

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

export const carBakRoute: Routes = [
    {
        path: '',
        component: CarBakComponent,
        resolve: {
            'pagingParams': CarBakResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_CAR_BAK'],
            pageTitle: 'niopdcgatewayApp.carBak.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const carBakPopupRoute: Routes = [
  {
    path: 'new/:carId',
    component: CarBakPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'CREATE_CAR_BAK'],
        pageTitle: 'niopdcgatewayApp.carBak.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/edit',
    component: CarBakPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'EDIT_CAR_BAK'],
        pageTitle: 'niopdcgatewayApp.carBak.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/delete',
    component: CarBakDeletePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'DELETE_CAR_BAK'],
        pageTitle: 'niopdcgatewayApp.carBak.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
      path: ':id/:view',
      component: CarBakPopupComponent,
      data: {
          authorities: ['ROLE_ADMIN', 'VIEW_CAR_BAK'],
          pageTitle: 'niopdcgatewayApp.carBak.home.title'
      },
      canActivate: [UserRouteAccessService],
      outlet: 'popup'
  }
];
