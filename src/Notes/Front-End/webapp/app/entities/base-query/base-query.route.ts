import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { BaseQueryComponent } from './base-query.component';
import { BaseQueryPopupComponent } from './base-query-dialog.component';
import { BaseQueryDeletePopupComponent } from './base-query-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class BaseQueryResolvePagingParams implements Resolve<any> {

        constructor(private paginationUtil: JhiPaginationUtil) {}

        resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
            const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
            const size = route.queryParams['size'] ? route.queryParams['size'] : ITEMS_PER_PAGE;
            const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,desc';
            return {
                page: this.paginationUtil.parsePage(page),
                size: this.paginationUtil.parsePage(size),
                predicate: this.paginationUtil.parsePredicate(sort),
                ascending: this.paginationUtil.parseAscending(sort)
            };
        }
    }

export const baseQueryRoute: Routes = [
    {
        path: '',
        component: BaseQueryComponent,
        resolve: {
            'pagingParams': BaseQueryResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_BASE_QUERY'],
            pageTitle: 'niopdcgatewayApp.baseQuery.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const baseQueryPopupRoute: Routes = [
  {
    path: 'new',
    component: BaseQueryPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'CREATE_BASE_QUERY'],
        pageTitle: 'niopdcgatewayApp.baseQuery.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/edit',
    component: BaseQueryPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'EDIT_BASE_QUERY'],
        pageTitle: 'niopdcgatewayApp.baseQuery.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/delete',
    component: BaseQueryDeletePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'DELETE_BASE_QUERY'],
        pageTitle: 'niopdcgatewayApp.baseQuery.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
      path: ':id/:view',
      component: BaseQueryPopupComponent,
      data: {
          authorities: ['ROLE_ADMIN', 'VIEW_BASE_QUERY'],
          pageTitle: 'niopdcgatewayApp.baseQuery.home.title'
      },
      canActivate: [UserRouteAccessService],
      outlet: 'popup'
  }
];
