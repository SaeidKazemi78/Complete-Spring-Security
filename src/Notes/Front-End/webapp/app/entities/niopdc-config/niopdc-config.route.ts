import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { NiopdcConfigComponent } from './niopdc-config.component';
import { NiopdcConfigPopupComponent } from './niopdc-config-dialog.component';
import { NiopdcConfigDeletePopupComponent } from './niopdc-config-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class NiopdcConfigResolvePagingParams implements Resolve<any> {

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

export const niopdcConfigRoute: Routes = [
    {
        path: '',
        component: NiopdcConfigComponent,
        resolve: {
            'pagingParams': NiopdcConfigResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_NIOPDC_CONFIG'],
            pageTitle: 'niopdcgatewayApp.niopdcConfig.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const niopdcConfigPopupRoute: Routes = [
  {
    path: 'new',
    component: NiopdcConfigPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'CREATE_NIOPDC_CONFIG'],
        pageTitle: 'niopdcgatewayApp.niopdcConfig.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/edit',
    component: NiopdcConfigPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'EDIT_NIOPDC_CONFIG'],
        pageTitle: 'niopdcgatewayApp.niopdcConfig.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/delete',
    component: NiopdcConfigDeletePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'DELETE_NIOPDC_CONFIG'],
        pageTitle: 'niopdcgatewayApp.niopdcConfig.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
      path: ':id/:view',
      component: NiopdcConfigPopupComponent,
      data: {
          authorities: ['ROLE_ADMIN', 'VIEW_NIOPDC_CONFIG'],
          pageTitle: 'niopdcgatewayApp.niopdcConfig.home.title'
      },
      canActivate: [UserRouteAccessService],
      outlet: 'popup'
  }
];
