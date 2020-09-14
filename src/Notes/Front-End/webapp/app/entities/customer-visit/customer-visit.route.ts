import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { ITEMS_PER_PAGE, UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CustomerVisitComponent } from './customer-visit.component';
import { CustomerVisitPopupComponent } from './customer-visit-dialog.component';
import { CustomerVisitDeletePopupComponent } from './customer-visit-delete-dialog.component';

@Injectable()
export class CustomerVisitResolvePagingParams implements Resolve<any> {

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

export const customerVisitRoute: Routes = [
    {
        path: '',
        component: CustomerVisitComponent,
        resolve: {
            'pagingParams': CustomerVisitResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_CUSTOMER_VISIT'],
            pageTitle: 'niopdcgatewayApp.customerVisit.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const customerVisitPopupRoute: Routes = [
  {
    path: ':customerId/new',
    component: CustomerVisitPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN','CREATE_CUSTOMER_VISIT'],
        pageTitle: 'niopdcgatewayApp.customerVisit.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/edit',
    component: CustomerVisitPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN','EDIT_CUSTOMER_VISIT'],
        pageTitle: 'niopdcgatewayApp.customerVisit.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/delete',
    component: CustomerVisitDeletePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN','DELETE_CUSTOMER_VISIT'],
        pageTitle: 'niopdcgatewayApp.customerVisit.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
      path: ':id/:view',
      component: CustomerVisitPopupComponent,
      data: {
          authorities: ['ROLE_ADMIN','VIEW_CUSTOMER_VISIT'],
          pageTitle: 'niopdcgatewayApp.customerVisit.home.title'
      },
      canActivate: [UserRouteAccessService],
      outlet: 'popup'
  }
];
