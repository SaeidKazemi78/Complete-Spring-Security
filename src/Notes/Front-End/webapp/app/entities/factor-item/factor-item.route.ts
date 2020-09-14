import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { FactorItemComponent } from './factor-item.component';
import { FactorItemPopupComponent } from './factor-item-dialog.component';
import { FactorItemDeletePopupComponent } from './factor-item-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class FactorItemResolvePagingParams implements Resolve<any> {

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

export const factorItemRoute: Routes = [
    {
        path: 'factor/:factorId/factor-item',
        component: FactorItemComponent,
        resolve: {
            'pagingParams': FactorItemResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_FACTOR_ITEM'],
            pageTitle: 'niopdcgatewayApp.factorItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const factorItemPopupRoute: Routes = [
  {
    path: 'factor-item-new/:factorId',
    component: FactorItemPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'CREATE_FACTOR_ITEM'],
        pageTitle: 'niopdcgatewayApp.factorItem.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'factor-item/:id/edit',
    component: FactorItemPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'EDIT_FACTOR_ITEM'],
        pageTitle: 'niopdcgatewayApp.factorItem.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'factor-item/:id/delete',
    component: FactorItemDeletePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'DELETE_FACTOR_ITEM'],
        pageTitle: 'niopdcgatewayApp.factorItem.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
      path: 'factor-item/:id/:view',
      component: FactorItemPopupComponent,
      data: {
          authorities: ['ROLE_ADMIN', 'VIEW_FACTOR_ITEM'],
          pageTitle: 'niopdcgatewayApp.factorItem.home.title'
      },
      canActivate: [UserRouteAccessService],
      outlet: 'popup'
  }
];
