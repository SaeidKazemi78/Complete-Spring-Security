import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { ITEMS_PER_PAGE, UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { RouteComponent } from './route.component';
import { RoutePopupComponent } from './route-dialog.component';
import { RouteDeletePopupComponent } from './route-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class RouteResolvePagingParams implements Resolve<any> {

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

export const routeRoute: Routes = [
    {
        path: '',
        component: RouteComponent,
        resolve: {
            'pagingParams': RouteResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_ROUTE'],
            pageTitle: 'niopdcgatewayApp.route.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const routePopupRoute: Routes = [
  {
    path: 'new',
    component: RoutePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'CREATE_ROUTE'],
        pageTitle: 'niopdcgatewayApp.route.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/edit',
    component: RoutePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'EDIT_ROUTE'],
        pageTitle: 'niopdcgatewayApp.route.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/delete',
    component: RouteDeletePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'DELETE_ROUTE'],
        pageTitle: 'niopdcgatewayApp.route.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
      path: ':id/:view',
      component: RoutePopupComponent,
      data: {
          authorities: ['ROLE_ADMIN', 'VIEW_ROUTE'],
          pageTitle: 'niopdcgatewayApp.route.home.title'
      },
      canActivate: [UserRouteAccessService],
      outlet: 'popup'
  }
];
