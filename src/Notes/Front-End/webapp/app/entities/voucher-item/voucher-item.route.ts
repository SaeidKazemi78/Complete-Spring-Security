import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { ITEMS_PER_PAGE, UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { VoucherItemComponent } from './voucher-item.component';
import { VoucherItemPopupComponent } from './voucher-item-dialog.component';
import { VoucherItemDeletePopupComponent } from './voucher-item-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class VoucherItemResolvePagingParams implements Resolve<any> {

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

export const voucherItemRoute: Routes = [
    {
        path: ':voucherMasterId/voucher-item',
        component: VoucherItemComponent,
        resolve: {
            'pagingParams': VoucherItemResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_VOUCHER_ITEM'],
            pageTitle: 'niopdcgatewayApp.voucherItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const voucherItemPopupRoute: Routes = [
  {
    path: ':voucherMasterId',
    component: VoucherItemPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'CREATE_VOUCHER_ITEM'],
        pageTitle: 'niopdcgatewayApp.voucherItem.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/edit',
    component: VoucherItemPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'EDIT_VOUCHER_ITEM'],
        pageTitle: 'niopdcgatewayApp.voucherItem.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/delete',
    component: VoucherItemDeletePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'DELETE_VOUCHER_ITEM'],
        pageTitle: 'niopdcgatewayApp.voucherItem.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
      path: ':id/:view',
      component: VoucherItemPopupComponent,
      data: {
          authorities: ['ROLE_ADMIN', 'VIEW_VOUCHER_ITEM'],
          pageTitle: 'niopdcgatewayApp.voucherItem.home.title'
      },
      canActivate: [UserRouteAccessService],
      outlet: 'popup'
  }
];
