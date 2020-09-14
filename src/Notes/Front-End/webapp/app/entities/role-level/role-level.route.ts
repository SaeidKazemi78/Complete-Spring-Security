import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { ITEMS_PER_PAGE, UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { RoleLevelComponent } from './role-level.component';
import { RoleLevelPopupComponent } from './role-level-dialog.component';
import { RoleLevelDeletePopupComponent } from './role-level-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class RoleLevelResolvePagingParams implements Resolve<any> {

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

export const roleLevelRoute: Routes = [
    {
        path: '',
        component: RoleLevelComponent,
        resolve: {
            'pagingParams': RoleLevelResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_PSP_CONFIG'],
            pageTitle: 'niopdcgatewayApp.roleLevel.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const roleLevelPopupRoute: Routes = [
  {
    path: 'new',
    component: RoleLevelPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'CREATE_PSP_CONFIG'],
        pageTitle: 'niopdcgatewayApp.roleLevel.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/edit',
    component: RoleLevelPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'EDIT_PSP_CONFIG'],
        pageTitle: 'niopdcgatewayApp.roleLevel.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/delete',
    component: RoleLevelDeletePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'DELETE_PSP_CONFIG'],
        pageTitle: 'niopdcgatewayApp.roleLevel.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
      path: ':id/:view',
      component: RoleLevelPopupComponent,
      data: {
          authorities: ['ROLE_ADMIN', 'VIEW_PSP_CONFIG'],
          pageTitle: 'niopdcgatewayApp.roleLevel.home.title'
      },
      canActivate: [UserRouteAccessService],
      outlet: 'popup'
  }
];
