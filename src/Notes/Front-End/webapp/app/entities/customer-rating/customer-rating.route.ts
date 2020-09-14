import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CustomerRatingComponent } from './customer-rating.component';
import { CustomerRatingPopupComponent } from './customer-rating-dialog.component';
import { CustomerRatingDeletePopupComponent } from './customer-rating-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class CustomerRatingResolvePagingParams implements Resolve<any> {

        constructor(private paginationUtil: JhiPaginationUtil) {}

        resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
            const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
            const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,desc';
            return {
                page: this.paginationUtil.parsePage(page),
                predicate: this.paginationUtil.parsePredicate(sort),
                ascending: this.paginationUtil.parseAscending(sort)
            };
        }
    }

export const customerRatingRoute: Routes = [
    {
        path: 'customer-rating',
        component: CustomerRatingComponent,
        resolve: {
            'pagingParams': CustomerRatingResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_CUSTOMER_RATING'],
            pageTitle: 'niopdcgatewayApp.customerRating.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const customerRatingPopupRoute: Routes = [
  {
    path: 'customer-rating-new',
    component: CustomerRatingPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'CREATE_CUSTOMER_RATING'],
        pageTitle: 'niopdcgatewayApp.customerRating.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'customer-rating/:id/edit',
    component: CustomerRatingPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'EDIT_CUSTOMER_RATING'],
        pageTitle: 'niopdcgatewayApp.customerRating.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'customer-rating/:id/delete',
    component: CustomerRatingDeletePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'DELETE_CUSTOMER_RATING'],
        pageTitle: 'niopdcgatewayApp.customerRating.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
      path: 'customer-rating/:id/:view',
      component: CustomerRatingPopupComponent,
      data: {
          authorities: ['ROLE_ADMIN', 'VIEW_CUSTOMER_RATING'],
          pageTitle: 'niopdcgatewayApp.customerRating.home.title'
      },
      canActivate: [UserRouteAccessService],
      outlet: 'popup'
  }
];
