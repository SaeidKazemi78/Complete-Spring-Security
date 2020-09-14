import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { ITEMS_PER_PAGE, UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { LoanTypeComponent } from './loan-type.component';
import { LoanTypePopupComponent } from './loan-type-dialog.component';
import { LoanTypeDeletePopupComponent } from './loan-type-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class LoanTypeResolvePagingParams implements Resolve<any> {

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

export const loanTypeRoute: Routes = [
    {
        path: '',
        component: LoanTypeComponent,
        resolve: {
            'pagingParams': LoanTypeResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_LOAN_TYPE'],
            pageTitle: 'niopdcgatewayApp.loanType.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const loanTypePopupRoute: Routes = [
  {
    path: 'new',
    component: LoanTypePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'CREATE_LOAN_TYPE'],
        pageTitle: 'niopdcgatewayApp.loanType.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/edit',
    component: LoanTypePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'EDIT_LOAN_TYPE'],
        pageTitle: 'niopdcgatewayApp.loanType.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/delete',
    component: LoanTypeDeletePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'DELETE_LOAN_TYPE'],
        pageTitle: 'niopdcgatewayApp.loanType.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
      path: ':id/:view',
      component: LoanTypePopupComponent,
      data: {
          authorities: ['ROLE_ADMIN', 'VIEW_LOAN_TYPE'],
          pageTitle: 'niopdcgatewayApp.loanType.home.title'
      },
      canActivate: [UserRouteAccessService],
      outlet: 'popup'
  }
];
