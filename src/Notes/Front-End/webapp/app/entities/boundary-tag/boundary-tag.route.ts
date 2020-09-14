import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { BoundaryTagComponent } from './boundary-tag.component';
import { BoundaryTagPopupComponent } from './boundary-tag-dialog.component';
import { BoundaryTagDeletePopupComponent } from './boundary-tag-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class BoundaryTagResolvePagingParams implements Resolve<any> {

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

export const boundaryTagRoute: Routes = [
    {
        path: 'location/:locationId/boundary-tag',
        component: BoundaryTagComponent,
        resolve: {
            'pagingParams': BoundaryTagResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_BOUNDARY_TAG'],
            pageTitle: 'niopdcgatewayApp.boundaryTag.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const boundaryTagPopupRoute: Routes = [
  {
    path: 'boundary-tag-new/:locationId',
    component: BoundaryTagPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'CREATE_BOUNDARY_TAG'],
        pageTitle: 'niopdcgatewayApp.boundaryTag.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'boundary-tag/:id/edit',
    component: BoundaryTagPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'EDIT_BOUNDARY_TAG'],
        pageTitle: 'niopdcgatewayApp.boundaryTag.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'boundary-tag/:id/delete',
    component: BoundaryTagDeletePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'DELETE_BOUNDARY_TAG'],
        pageTitle: 'niopdcgatewayApp.boundaryTag.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
      path: 'boundary-tag/:id/:view',
      component: BoundaryTagPopupComponent,
      data: {
          authorities: ['ROLE_ADMIN', 'VIEW_BOUNDARY_TAG'],
          pageTitle: 'niopdcgatewayApp.boundaryTag.home.title'
      },
      canActivate: [UserRouteAccessService],
      outlet: 'popup'
  }
];
