import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { ITEMS_PER_PAGE, UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { SealComponent } from './seal.component';
import { SealPopupComponent } from './seal-dialog.component';
import { SealDeletePopupComponent } from './seal-delete-dialog.component';

@Injectable()
export class SealResolvePagingParams implements Resolve<any> {

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

export const sealRoute: Routes = [
    {
        path: '',
        component: SealComponent,
        resolve: {
            'pagingParams': SealResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_SEAL'],
            pageTitle: 'niopdcgatewayApp.seal.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sealPopupRoute: Routes = [
  {
    path: 'new/:refuelCenterId',
    component: SealPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN','CREATE_SEAL'],
        pageTitle: 'niopdcgatewayApp.seal.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/edit',
    component: SealPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN','EDIT_SEAL'],
        pageTitle: 'niopdcgatewayApp.seal.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/delete',
    component: SealDeletePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN','DELETE_SEAL'],
        pageTitle: 'niopdcgatewayApp.seal.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
      path: ':id/:view',
      component: SealPopupComponent,
      data: {
          authorities: ['ROLE_ADMIN','VIEW_SEAL'],
          pageTitle: 'niopdcgatewayApp.seal.home.title'
      },
      canActivate: [UserRouteAccessService],
      outlet: 'popup'
  }
];
