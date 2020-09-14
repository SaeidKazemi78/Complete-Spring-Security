import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { ITEMS_PER_PAGE, UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ProductSrcComponent } from './product-src.component';
import { ProductSrcPopupComponent } from './product-src-dialog.component';
import { ProductSrcDeletePopupComponent } from './product-src-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class ProductSrcResolvePagingParams implements Resolve<any> {

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

export const productSrcRoute: Routes = [
    {
        path: '',
        component: ProductSrcComponent,
        resolve: {
            'pagingParams': ProductSrcResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_PRODUCT_SRC'],
            pageTitle: 'niopdcgatewayApp.productSrc.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const productSrcPopupRoute: Routes = [
  {
    path: 'new',
    component: ProductSrcPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'CREATE_PRODUCT_SRC'],
        pageTitle: 'niopdcgatewayApp.productSrc.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/edit',
    component: ProductSrcPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'EDIT_PRODUCT_SRC'],
        pageTitle: 'niopdcgatewayApp.productSrc.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/delete',
    component: ProductSrcDeletePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'DELETE_PRODUCT_SRC'],
        pageTitle: 'niopdcgatewayApp.productSrc.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
      path: ':id/:view',
      component: ProductSrcPopupComponent,
      data: {
          authorities: ['ROLE_ADMIN', 'VIEW_PRODUCT_SRC'],
          pageTitle: 'niopdcgatewayApp.productSrc.home.title'
      },
      canActivate: [UserRouteAccessService],
      outlet: 'popup'
  }
];
