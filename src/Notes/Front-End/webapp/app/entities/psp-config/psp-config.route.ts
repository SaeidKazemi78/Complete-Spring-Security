import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { ITEMS_PER_PAGE, UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { PspConfigComponent } from './psp-config.component';
import { PspConfigPopupComponent } from './psp-config-dialog.component';
import { PspConfigDeletePopupComponent } from './psp-config-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class PspConfigResolvePagingParams implements Resolve<any> {

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

export const pspConfigRoute: Routes = [
    {
        path: '',
        component: PspConfigComponent,
        resolve: {
            'pagingParams': PspConfigResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_PSP_CONFIG'],
            pageTitle: 'niopdcgatewayApp.pspConfig.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const pspConfigPopupRoute: Routes = [
  {
    path: 'new',
    component: PspConfigPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'CREATE_PSP_CONFIG'],
        pageTitle: 'niopdcgatewayApp.pspConfig.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/edit',
    component: PspConfigPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'EDIT_PSP_CONFIG'],
        pageTitle: 'niopdcgatewayApp.pspConfig.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/delete',
    component: PspConfigDeletePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'DELETE_PSP_CONFIG'],
        pageTitle: 'niopdcgatewayApp.pspConfig.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
      path: ':id/:view',
      component: PspConfigPopupComponent,
      data: {
          authorities: ['ROLE_ADMIN', 'VIEW_PSP_CONFIG'],
          pageTitle: 'niopdcgatewayApp.pspConfig.home.title'
      },
      canActivate: [UserRouteAccessService],
      outlet: 'popup'
  }
];
