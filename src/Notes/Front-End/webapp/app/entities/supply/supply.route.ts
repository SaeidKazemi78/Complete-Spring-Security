import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { ITEMS_PER_PAGE, UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { SupplyComponent } from './supply.component';
import { SupplyPopupComponent } from './supply-dialog.component';
import { SupplyDeletePopupComponent } from './supply-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class SupplyResolvePagingParams implements Resolve<any> {

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

export const supplyRoute: Routes = [
    {
        path: '',
        component: SupplyComponent,
        resolve: {
            'pagingParams': SupplyResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_SUPPLY'],
            pageTitle: 'niopdcgatewayApp.supply.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const supplyPopupRoute: Routes = [
  {
    path: 'new',
    component: SupplyPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN','CREATE_SUPPLY'],
        pageTitle: 'niopdcgatewayApp.supply.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/edit',
    component: SupplyPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN','EDIT_SUPPLY'],
        pageTitle: 'niopdcgatewayApp.supply.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/delete',
    component: SupplyDeletePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN','DELETE_SUPPLY'],
        pageTitle: 'niopdcgatewayApp.supply.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
      path: ':id/:view',
      component: SupplyPopupComponent,
      data: {
          authorities: ['ROLE_ADMIN','VIEW_SUPPLY'],
          pageTitle: 'niopdcgatewayApp.supply.home.title'
      },
      canActivate: [UserRouteAccessService],
      outlet: 'popup'
  }
];
