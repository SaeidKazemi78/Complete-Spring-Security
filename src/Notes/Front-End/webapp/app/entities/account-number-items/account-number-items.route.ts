import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { ITEMS_PER_PAGE, UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { AccountNumberItemsComponent } from './account-number-items.component';
import { AccountNumberItemsPopupComponent } from './account-number-items-dialog.component';
import { AccountNumberItemsDeletePopupComponent } from './account-number-items-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class AccountNumberItemsResolvePagingParams implements Resolve<any> {

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

export const accountNumberItemsRoute: Routes = [
    {
        path: '',
        component: AccountNumberItemsComponent,
        resolve: {
            'pagingParams': AccountNumberItemsResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_ACCOUNT_NUMBER_ITEMS'],
            pageTitle: 'niopdcgatewayApp.accountNumberItems.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const accountNumberItemsPopupRoute: Routes = [
  {
    path: 'new',
    component: AccountNumberItemsPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'CREATE_ACCOUNT_NUMBER_ITEMS'],
        pageTitle: 'niopdcgatewayApp.accountNumberItems.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/edit',
    component: AccountNumberItemsPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'EDIT_ACCOUNT_NUMBER_ITEMS'],
        pageTitle: 'niopdcgatewayApp.accountNumberItems.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/delete',
    component: AccountNumberItemsDeletePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'DELETE_ACCOUNT_NUMBER_ITEMS'],
        pageTitle: 'niopdcgatewayApp.accountNumberItems.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
      path: ':id/:view',
      component: AccountNumberItemsPopupComponent,
      data: {
          authorities: ['ROLE_ADMIN', 'VIEW_ACCOUNT_NUMBER_ITEMS'],
          pageTitle: 'niopdcgatewayApp.accountNumberItems.home.title'
      },
      canActivate: [UserRouteAccessService],
      outlet: 'popup'
  }
];
