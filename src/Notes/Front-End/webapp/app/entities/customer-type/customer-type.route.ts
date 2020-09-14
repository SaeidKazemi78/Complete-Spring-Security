import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import { CustomerTypeComponent } from './customer-type.component';
import { CustomerTypePopupComponent } from './customer-type-dialog.component';
import { CustomerTypeDeletePopupComponent } from './customer-type-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class CustomerTypeResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const size = route.queryParams['size'] ? route.queryParams['size'] : ITEMS_PER_PAGE;
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'title,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            size: this.paginationUtil.parsePage(size),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
        };
    }
}

export const customerTypeRoute: Routes = [
    {
        path: '',
        component: CustomerTypeComponent,
        resolve: {
            'pagingParams': CustomerTypeResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_CUSTOMER_TYPE'],
            pageTitle: 'niopdcgatewayApp.customerType.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
];

export const customerTypePopupRoute: Routes = [
  {
    path: 'new',
    component: CustomerTypePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'CREATE_CUSTOMER_TYPE'],
        pageTitle: 'niopdcgatewayApp.customerType.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/edit',
    component: CustomerTypePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'EDIT_CUSTOMER_TYPE'],
        pageTitle: 'niopdcgatewayApp.customerType.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/delete',
    component: CustomerTypeDeletePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'DELETE_CUSTOMER_TYPE'],
        pageTitle: 'niopdcgatewayApp.customerType.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
      path: ':id/:view',
      component: CustomerTypePopupComponent,
      data: {
          authorities: ['ROLE_ADMIN', 'VIEW_CUSTOMER_TYPE'],
          pageTitle: 'niopdcgatewayApp.customerType.home.title'
      },
      canActivate: [UserRouteAccessService],
      outlet: 'popup'
  }
];
