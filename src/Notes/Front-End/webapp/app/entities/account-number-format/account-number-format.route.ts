import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { ITEMS_PER_PAGE, UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { AccountNumberFormatComponent } from './account-number-format.component';
import { AccountNumberFormatPopupComponent } from './account-number-format-dialog.component';
import { AccountNumberFormatDeletePopupComponent } from './account-number-format-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class AccountNumberFormatResolvePagingParams implements Resolve<any> {

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

export const accountNumberFormatRoute: Routes = [
    {
        path: '',
        component: AccountNumberFormatComponent,
        resolve: {
            'pagingParams': AccountNumberFormatResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_ACCOUNT_NUMBER_FORMAT'],
            pageTitle: 'niopdcgatewayApp.accountNumberFormat.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const accountNumberFormatPopupRoute: Routes = [
  {
    path: 'new',
    component: AccountNumberFormatPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'CREATE_ACCOUNT_NUMBER_FORMAT'],
        pageTitle: 'niopdcgatewayApp.accountNumberFormat.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/edit',
    component: AccountNumberFormatPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'EDIT_ACCOUNT_NUMBER_FORMAT'],
        pageTitle: 'niopdcgatewayApp.accountNumberFormat.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/delete',
    component: AccountNumberFormatDeletePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'DELETE_ACCOUNT_NUMBER_FORMAT'],
        pageTitle: 'niopdcgatewayApp.accountNumberFormat.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
      path: ':id/:view',
      component: AccountNumberFormatPopupComponent,
      data: {
          authorities: ['ROLE_ADMIN', 'VIEW_ACCOUNT_NUMBER_FORMAT'],
          pageTitle: 'niopdcgatewayApp.accountNumberFormat.home.title'
      },
      canActivate: [UserRouteAccessService],
      outlet: 'popup'
  }
];
