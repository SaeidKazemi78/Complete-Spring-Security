import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { TagRateComponent } from './tag-rate.component';
import { TagRatePopupComponent } from './tag-rate-dialog.component';
import { TagRateDeletePopupComponent } from './tag-rate-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class TagRateResolvePagingParams implements Resolve<any> {

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

export const tagRateRoute: Routes = [
    {
        path: 'location/:locationId/tag-rate',
        component: TagRateComponent,
        resolve: {
            'pagingParams': TagRateResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_TAG_RATE'],
            pageTitle: 'niopdcgatewayApp.tagRate.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tagRatePopupRoute: Routes = [
  {
    path: 'tag-rate-new/:locationId',
    component: TagRatePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'CREATE_TAG_RATE'],
        pageTitle: 'niopdcgatewayApp.tagRate.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'tag-rate/:id/edit',
    component: TagRatePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'EDIT_TAG_RATE'],
        pageTitle: 'niopdcgatewayApp.tagRate.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'tag-rate/:id/delete',
    component: TagRateDeletePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'DELETE_TAG_RATE'],
        pageTitle: 'niopdcgatewayApp.tagRate.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
      path: 'tag-rate/:id/:view',
      component: TagRatePopupComponent,
      data: {
          authorities: ['ROLE_ADMIN', 'VIEW_TAG_RATE'],
          pageTitle: 'niopdcgatewayApp.tagRate.home.title'
      },
      canActivate: [UserRouteAccessService],
      outlet: 'popup'
  }
];
