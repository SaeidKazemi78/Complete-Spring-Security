import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { ITEMS_PER_PAGE, UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CustomerCapacityComponent } from './customer-capacity.component';
import { CustomerCapacityPopupComponent } from './customer-capacity-dialog.component';
import { CustomerCapacityDeletePopupComponent } from './customer-capacity-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class CustomerCapacityResolvePagingParams implements Resolve<any> {

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

export const customerCapacityRoute: Routes = [
    {
        path: '',
        component: CustomerCapacityComponent,
        resolve: {
            'pagingParams': CustomerCapacityResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_CUSTOMER_CAPACITY'],
            pageTitle: 'niopdcgatewayApp.customerCapacity.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const customerCapacityPopupRoute: Routes = [
  {
    path: 'new/:customerId',
    component: CustomerCapacityPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'CREATE_CUSTOMER_CAPACITY'],
        pageTitle: 'niopdcgatewayApp.customerCapacity.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/edit',
    component: CustomerCapacityPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'EDIT_CUSTOMER_CAPACITY'],
        pageTitle: 'niopdcgatewayApp.customerCapacity.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/delete',
    component: CustomerCapacityDeletePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'DELETE_CUSTOMER_CAPACITY'],
        pageTitle: 'niopdcgatewayApp.customerCapacity.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
      path: ':id/:view',
      component: CustomerCapacityPopupComponent,
      data: {
          authorities: ['ROLE_ADMIN', 'VIEW_CUSTOMER_CAPACITY'],
          pageTitle: 'niopdcgatewayApp.customerCapacity.home.title'
      },
      canActivate: [UserRouteAccessService],
      outlet: 'popup'
  }
];
