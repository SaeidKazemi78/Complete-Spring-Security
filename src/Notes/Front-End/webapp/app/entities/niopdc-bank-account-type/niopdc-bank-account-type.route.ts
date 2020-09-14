import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { ITEMS_PER_PAGE, UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { NiopdcBankAccountTypeComponent } from './niopdc-bank-account-type.component';
import { NiopdcBankAccountTypePopupComponent } from './niopdc-bank-account-type-dialog.component';
import { NiopdcBankAccountTypeDeletePopupComponent } from './niopdc-bank-account-type-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class NiopdcBankAccountTypeResolvePagingParams implements Resolve<any> {

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

export const niopdcBankAccountTypeRoute: Routes = [
    {
        path: '',
        component: NiopdcBankAccountTypeComponent,
        resolve: {
            'pagingParams': NiopdcBankAccountTypeResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_NIOPDC_BANK_ACCOUNT_TYPE'],
            pageTitle: 'niopdcgatewayApp.niopdcBankAccountType.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const niopdcBankAccountTypePopupRoute: Routes = [
  {
    path: 'new',
    component: NiopdcBankAccountTypePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'CREATE_NIOPDC_BANK_ACCOUNT_TYPE'],
        pageTitle: 'niopdcgatewayApp.niopdcBankAccountType.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/edit',
    component: NiopdcBankAccountTypePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'EDIT_NIOPDC_BANK_ACCOUNT_TYPE'],
        pageTitle: 'niopdcgatewayApp.niopdcBankAccountType.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/delete',
    component: NiopdcBankAccountTypeDeletePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'DELETE_NIOPDC_BANK_ACCOUNT_TYPE'],
        pageTitle: 'niopdcgatewayApp.niopdcBankAccountType.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
      path: ':id/:view',
      component: NiopdcBankAccountTypePopupComponent,
      data: {
          authorities: ['ROLE_ADMIN', 'VIEW_NIOPDC_BANK_ACCOUNT_TYPE'],
          pageTitle: 'niopdcgatewayApp.niopdcBankAccountType.home.title'
      },
      canActivate: [UserRouteAccessService],
      outlet: 'popup'
  }
];
