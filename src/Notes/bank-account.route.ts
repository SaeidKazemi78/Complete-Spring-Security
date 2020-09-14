import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { ITEMS_PER_PAGE, UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { BankAccountComponent } from './bank-account.component';
import { BankAccountPopupComponent } from './bank-account-dialog.component';
import { BankAccountDeletePopupComponent } from './bank-account-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class BankAccountResolvePagingParams implements Resolve<any> {

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

export const bankAccountRoute: Routes = [
    {
        path: '',
        component: BankAccountComponent,
        resolve: {
            'pagingParams': BankAccountResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_BANK_ACCOUNT'],
            pageTitle: 'niopdcgatewayApp.bankAccount.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bankAccountPopupRoute: Routes = [
  {
    path: 'new/:personId',
    component: BankAccountPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'CREATE_BANK_ACCOUNT'],
        pageTitle: 'niopdcgatewayApp.bankAccount.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/edit',
    component: BankAccountPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'EDIT_BANK_ACCOUNT'],
        pageTitle: 'niopdcgatewayApp.bankAccount.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/delete',
    component: BankAccountDeletePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'DELETE_BANK_ACCOUNT'],
        pageTitle: 'niopdcgatewayApp.bankAccount.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
      path: ':id/:view',
      component: BankAccountPopupComponent,
      data: {
          authorities: ['ROLE_ADMIN', 'VIEW_BANK_ACCOUNT'],
          pageTitle: 'niopdcgatewayApp.bankAccount.home.title'
      },
      canActivate: [UserRouteAccessService],
      outlet: 'popup'
  }
];
