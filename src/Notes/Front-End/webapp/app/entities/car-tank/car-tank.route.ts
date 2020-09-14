import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CarTankComponent } from './car-tank.component';
import { CarTankPopupComponent } from './car-tank-dialog.component';
import { CarTankDeletePopupComponent } from './car-tank-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class CarTankResolvePagingParams implements Resolve<any> {

        constructor(private paginationUtil: JhiPaginationUtil) {}

        resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
            const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
            const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'tankNo,desc';
            return {
                page: this.paginationUtil.parsePage(page),
                predicate: this.paginationUtil.parsePredicate(sort),
                ascending: this.paginationUtil.parseAscending(sort)
            };
        }
    }

export const carTankRoute: Routes = [
    {
        path: '',
        component: CarTankComponent,
        resolve: {
            'pagingParams': CarTankResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_CAR_TANK'],
            pageTitle: 'niopdcgatewayApp.carTank.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const carTankPopupRoute: Routes = [
  {
    path: 'car-tank-new/:customerId',
    component: CarTankPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'CREATE_CAR_TANK'],
        pageTitle: 'niopdcgatewayApp.carTank.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'car-tank/:id/edit',
    component: CarTankPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'EDIT_CAR_TANK'],
        pageTitle: 'niopdcgatewayApp.carTank.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'car-tank/:id/delete',
    component: CarTankDeletePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'DELETE_CAR_TANK'],
        pageTitle: 'niopdcgatewayApp.carTank.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
      path: 'car-tank/:id/:view',
      component: CarTankPopupComponent,
      data: {
          authorities: ['ROLE_ADMIN', 'VIEW_CAR_TANK'],
          pageTitle: 'niopdcgatewayApp.carTank.home.title'
      },
      canActivate: [UserRouteAccessService],
      outlet: 'popup'
  }
];
