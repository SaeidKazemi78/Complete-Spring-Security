import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import { CustomerTypeProductConsumptionComponent } from './customer-type-product-consumption.component';
import { CustomerTypeProductConsumptionPopupComponent } from './customer-type-product-consumption-dialog.component';
    import {
    CustomerTypeProductConsumptionDeletePopupComponent
} from './customer-type-product-consumption-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class CustomerTypeProductConsumptionResolvePagingParams implements Resolve<any> {

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

export const customerTypeProductConsumptionRoute: Routes = [
    {
        path: '',
        component: CustomerTypeProductConsumptionComponent,
        resolve: {
            'pagingParams': CustomerTypeProductConsumptionResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_CUSTOMER_TYPE_PRODUCT_CONSUMPTION'],
            pageTitle: 'niopdcgatewayApp.customerTypeProductConsumption.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const customerTypeProductConsumptionPopupRoute: Routes = [
  {
    path: 'new/:productId',
    component: CustomerTypeProductConsumptionPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'CREATE_CUSTOMER_TYPE_PRODUCT_CONSUMPTION'],
        pageTitle: 'niopdcgatewayApp.customerTypeProductConsumption.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/edit',
    component: CustomerTypeProductConsumptionPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'EDIT_CUSTOMER_TYPE_PRODUCT_CONSUMPTION'],
        pageTitle: 'niopdcgatewayApp.customerTypeProductConsumption.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/delete',
    component: CustomerTypeProductConsumptionDeletePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'DELETE_CUSTOMER_TYPE_PRODUCT_CONSUMPTION'],
        pageTitle: 'niopdcgatewayApp.customerTypeProductConsumption.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
      path: ':id/:view',
      component: CustomerTypeProductConsumptionPopupComponent,
      data: {
          authorities: ['ROLE_ADMIN', 'VIEW_CUSTOMER_TYPE_PRODUCT_CONSUMPTION'],
          pageTitle: 'niopdcgatewayApp.customerTypeProductConsumption.home.title'
      },
      canActivate: [UserRouteAccessService],
      outlet: 'popup'
  }
];
