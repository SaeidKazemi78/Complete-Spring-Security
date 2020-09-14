import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { ITEMS_PER_PAGE, UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserPosDeviceComponent } from './user-pos-device.component';
import { UserPosDevicePopupComponent } from './user-pos-device-dialog.component';
import { UserPosDeviceDeletePopupComponent } from './user-pos-device-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class UserPosDeviceResolvePagingParams implements Resolve<any> {

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

export const userPosDeviceRoute: Routes = [
    {
        path: '',
        component: UserPosDeviceComponent,
        resolve: {
            'pagingParams': UserPosDeviceResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_USER_POS_DEVICE'],
            pageTitle: 'niopdcgatewayApp.userPosDevice.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const userPosDevicePopupRoute: Routes = [
  {
    path: 'new',
    component: UserPosDevicePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'CREATE_USER_POS_DEVICE'],
        pageTitle: 'niopdcgatewayApp.userPosDevice.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/edit',
    component: UserPosDevicePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'EDIT_USER_POS_DEVICE'],
        pageTitle: 'niopdcgatewayApp.userPosDevice.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/delete',
    component: UserPosDeviceDeletePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'DELETE_USER_POS_DEVICE'],
        pageTitle: 'niopdcgatewayApp.userPosDevice.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
      path: ':id/:view',
      component: UserPosDevicePopupComponent,
      data: {
          authorities: ['ROLE_ADMIN', 'VIEW_USER_POS_DEVICE'],
          pageTitle: 'niopdcgatewayApp.userPosDevice.home.title'
      },
      canActivate: [UserRouteAccessService],
      outlet: 'popup'
  }
];
