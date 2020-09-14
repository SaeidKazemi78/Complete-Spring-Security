import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { ITEMS_PER_PAGE, UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { LoanPaymentComponent } from './loan-payment.component';
import { LoanPaymentPopupComponent } from './loan-payment-dialog.component';
import { LoanPaymentDeletePopupComponent } from './loan-payment-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class LoanPaymentResolvePagingParams implements Resolve<any> {

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

export const loanPaymentRoute: Routes = [
    {
        path: ':loanId/loan-payment',
        component: LoanPaymentComponent,
        resolve: {
            'pagingParams': LoanPaymentResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_LOAN_PAYMENT'],
            pageTitle: 'niopdcgatewayApp.loanPayment.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const loanPaymentPopupRoute: Routes = [
  {
    path: 'new/:loanId',
    component: LoanPaymentPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'CREATE_LOAN_PAYMENT'],
        pageTitle: 'niopdcgatewayApp.loanPayment.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/edit',
    component: LoanPaymentPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'EDIT_LOAN_PAYMENT'],
        pageTitle: 'niopdcgatewayApp.loanPayment.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/delete',
    component: LoanPaymentDeletePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'DELETE_LOAN_PAYMENT'],
        pageTitle: 'niopdcgatewayApp.loanPayment.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
      path: ':id/:view',
      component: LoanPaymentPopupComponent,
      data: {
          authorities: ['ROLE_ADMIN', 'VIEW_LOAN_PAYMENT'],
          pageTitle: 'niopdcgatewayApp.loanPayment.home.title'
      },
      canActivate: [UserRouteAccessService],
      outlet: 'popup'
  }
];
