import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { ITEMS_PER_PAGE, UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { PosDeviceComponent } from './pos-device.component';
import { PosDevicePopupComponent } from './pos-device-dialog.component';
import { PosDeviceDeletePopupComponent } from './pos-device-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class PosDeviceResolvePagingParams implements Resolve<any> {

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

export const posDeviceRoute: Routes = [
    {
        path: '',
        component: PosDeviceComponent,
        resolve: {
            'pagingParams': PosDeviceResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_POS_DEVICE'],
            pageTitle: 'niopdcgatewayApp.posDevice.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const posDevicePopupRoute: Routes = [
  {
    path: 'new',
    component: PosDevicePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'CREATE_POS_DEVICE'],
        pageTitle: 'niopdcgatewayApp.posDevice.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/edit',
    component: PosDevicePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'EDIT_POS_DEVICE'],
        pageTitle: 'niopdcgatewayApp.posDevice.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/delete',
    component: PosDeviceDeletePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'DELETE_POS_DEVICE'],
        pageTitle: 'niopdcgatewayApp.posDevice.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
      path: ':id/:view',
      component: PosDevicePopupComponent,
      data: {
          authorities: ['ROLE_ADMIN', 'VIEW_POS_DEVICE'],
          pageTitle: 'niopdcgatewayApp.posDevice.home.title'
      },
      canActivate: [UserRouteAccessService],
      outlet: 'popup'
  }
];
