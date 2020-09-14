import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { VoucherPaymentComponent } from './voucher-payment.component';
import { VoucherPaymentPopupComponent } from './voucher-payment-dialog.component';
import { VoucherPaymentDeletePopupComponent } from './voucher-payment-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class VoucherPaymentResolvePagingParams implements Resolve<any> {

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

export const voucherPaymentRoute: Routes = [
    {
        path: '',
        component: VoucherPaymentComponent,
        resolve: {
            'pagingParams': VoucherPaymentResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_VOUCHER_PAYMENT'],
            pageTitle: 'niopdcgatewayApp.voucherPayment.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const voucherPaymentPopupRoute: Routes = [
  {
    path: 'new',
    component: VoucherPaymentPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'CREATE_VOUCHER_PAYMENT'],
        pageTitle: 'niopdcgatewayApp.voucherPayment.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/edit',
    component: VoucherPaymentPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'EDIT_VOUCHER_PAYMENT'],
        pageTitle: 'niopdcgatewayApp.voucherPayment.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/delete',
    component: VoucherPaymentDeletePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'DELETE_VOUCHER_PAYMENT'],
        pageTitle: 'niopdcgatewayApp.voucherPayment.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
      path: ':id/:view',
      component: VoucherPaymentPopupComponent,
      data: {
          authorities: ['ROLE_ADMIN', 'VIEW_VOUCHER_PAYMENT'],
          pageTitle: 'niopdcgatewayApp.voucherPayment.home.title'
      },
      canActivate: [UserRouteAccessService],
      outlet: 'popup'
  }
];
