import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { ITEMS_PER_PAGE, UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ProductStepComponent } from './product-step.component';
import { ProductStepPopupComponent } from './product-step-dialog.component';
import { ProductStepDeletePopupComponent } from './product-step-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class ProductStepResolvePagingParams implements Resolve<any> {

        constructor(private paginationUtil: JhiPaginationUtil) {}

        resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
            const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
            const size = route.queryParams['size'] ? route.queryParams['size'] : ITEMS_PER_PAGE;
            const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'productTitle,asc';
            return {
                page: this.paginationUtil.parsePage(page),
                size: this.paginationUtil.parsePage(size),
                predicate: this.paginationUtil.parsePredicate(sort),
                ascending: this.paginationUtil.parseAscending(sort)
            };
        }
    }

export const productStepRoute: Routes = [
    {
        path: '',
        component: ProductStepComponent,
        resolve: {
            'pagingParams': ProductStepResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_PRODUCT_STEP'],
            pageTitle: 'niopdcgatewayApp.productStep.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const productStepPopupRoute: Routes = [
  {
    path: 'new',
    component: ProductStepPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'CREATE_PRODUCT_STEP'],
        pageTitle: 'niopdcgatewayApp.productStep.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/edit',
    component: ProductStepPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'EDIT_PRODUCT_STEP'],
        pageTitle: 'niopdcgatewayApp.productStep.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/delete',
    component: ProductStepDeletePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'DELETE_PRODUCT_STEP'],
        pageTitle: 'niopdcgatewayApp.productStep.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
      path: ':id/:view',
      component: ProductStepPopupComponent,
      data: {
          authorities: ['ROLE_ADMIN', 'VIEW_PRODUCT_STEP'],
          pageTitle: 'niopdcgatewayApp.productStep.home.title'
      },
      canActivate: [UserRouteAccessService],
      outlet: 'popup'
  }
];
