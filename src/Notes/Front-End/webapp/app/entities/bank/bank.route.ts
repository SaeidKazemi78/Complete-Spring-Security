import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { ITEMS_PER_PAGE, UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { BankComponent } from './bank.component';
import { BankPopupComponent } from './bank-dialog.component';
import { BankDeletePopupComponent } from './bank-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class BankResolvePagingParams implements Resolve<any> {

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

export const bankRoute: Routes = [
    {
        path: '',
        component: BankComponent,
        resolve: {
            'pagingParams': BankResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_BANK'],
            pageTitle: 'niopdcgatewayApp.bank.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bankPopupRoute: Routes = [
  {
    path: 'new',
    component: BankPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'CREATE_BANK'],
        pageTitle: 'niopdcgatewayApp.bank.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/edit',
    component: BankPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'EDIT_BANK'],
        pageTitle: 'niopdcgatewayApp.bank.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/delete',
    component: BankDeletePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'DELETE_BANK'],
        pageTitle: 'niopdcgatewayApp.bank.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
      path: ':id/:view',
      component: BankPopupComponent,
      data: {
          authorities: ['ROLE_ADMIN', 'VIEW_BANK'],
          pageTitle: 'niopdcgatewayApp.bank.home.title'
      },
      canActivate: [UserRouteAccessService],
      outlet: 'popup'
  }
];
