import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { ITEMS_PER_PAGE, UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CarComponent } from './car.component';
import { CarPopupComponent } from './car-dialog.component';
import { CarDeletePopupComponent } from './car-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class CarResolvePagingParams implements Resolve<any> {

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

export const carRoute: Routes = [
    {
        path: '',
        component: CarComponent,
        resolve: {
            'pagingParams': CarResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_CAR'],
            pageTitle: 'niopdcgatewayApp.car.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':carId/car-bak',
        loadChildren: '../car-bak/car-bak.module#NiopdcgatewayCarBakModule'
    },
    {
        path: ':carId/car-info',
        loadChildren: '../car-info/car-info.module#NiopdcgatewayCarInfoModule'
    },
    {
        path: ':carId/driver',
        loadChildren: '../driver/driver.module#NiopdcgatewayDriverModule'
    },
];

export const carPopupRoute: Routes = [
  {
    path: 'new',
    component: CarPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'CREATE_CAR'],
        pageTitle: 'niopdcgatewayApp.car.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/edit',
    component: CarPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'EDIT_CAR'],
        pageTitle: 'niopdcgatewayApp.car.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/delete',
    component: CarDeletePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'DELETE_CAR'],
        pageTitle: 'niopdcgatewayApp.car.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
      path: ':id/:view',
      component: CarPopupComponent,
      data: {
          authorities: ['ROLE_ADMIN', 'VIEW_CAR'],
          pageTitle: 'niopdcgatewayApp.car.home.title'
      },
      canActivate: [UserRouteAccessService],
      outlet: 'popup'
  }
];
