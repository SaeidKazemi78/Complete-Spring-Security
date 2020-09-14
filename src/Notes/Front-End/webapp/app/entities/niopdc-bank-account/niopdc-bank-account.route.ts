import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { ITEMS_PER_PAGE, UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { NiopdcBankAccountComponent } from './niopdc-bank-account.component';
import { NiopdcBankAccountPopupComponent } from './niopdc-bank-account-dialog.component';
import { NiopdcBankAccountDeletePopupComponent } from './niopdc-bank-account-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class NiopdcBankAccountResolvePagingParams implements Resolve<any> {

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

export const niopdcBankAccountRoute: Routes = [
    {
        path: '',
        component: NiopdcBankAccountComponent,
        resolve: {
            'pagingParams': NiopdcBankAccountResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_NIOPDC_BANK_ACCOUNT'],
            pageTitle: 'niopdcgatewayApp.niopdcBankAccount.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const niopdcBankAccountPopupRoute: Routes = [
  {
    path: 'new',
    component: NiopdcBankAccountPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'CREATE_NIOPDC_BANK_ACCOUNT'],
        pageTitle: 'niopdcgatewayApp.niopdcBankAccount.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/edit',
    component: NiopdcBankAccountPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'EDIT_NIOPDC_BANK_ACCOUNT'],
        pageTitle: 'niopdcgatewayApp.niopdcBankAccount.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/delete',
    component: NiopdcBankAccountDeletePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'DELETE_NIOPDC_BANK_ACCOUNT'],
        pageTitle: 'niopdcgatewayApp.niopdcBankAccount.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
      path: ':id/:view',
      component: NiopdcBankAccountPopupComponent,
      data: {
          authorities: ['ROLE_ADMIN', 'VIEW_NIOPDC_BANK_ACCOUNT'],
          pageTitle: 'niopdcgatewayApp.niopdcBankAccount.home.title'
      },
      canActivate: [UserRouteAccessService],
      outlet: 'popup'
  }
];
