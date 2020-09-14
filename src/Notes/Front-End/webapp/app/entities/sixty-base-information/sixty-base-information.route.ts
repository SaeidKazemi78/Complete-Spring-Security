import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { ITEMS_PER_PAGE, UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { SixtyBaseInformationComponent } from './sixty-base-information.component';
import { SixtyBaseInformationPopupComponent } from './sixty-base-information-dialog.component';
import { SixtyBaseInformationDeletePopupComponent } from './sixty-base-information-delete-dialog.component';

@Injectable()
export class SixtyBaseInformationResolvePagingParams implements Resolve<any> {

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

export const sixtyBaseInformationRoute: Routes = [
    {
        path: '',
        component: SixtyBaseInformationComponent,
        resolve: {
            'pagingParams': SixtyBaseInformationResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_SIXTY_BASE_INFORMATION_DEPOT','LIST_SIXTY_BASE_INFORMATION_OPERATION'],
            pageTitle: 'niopdcgatewayApp.sixtyBaseInformation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sixtyBaseInformationPopupRoute: Routes = [
  {
    path: 'new/:mode',
    component: SixtyBaseInformationPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'CREATE_SIXTY_BASE_INFORMATION'],
        pageTitle: 'niopdcgatewayApp.sixtyBaseInformation.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/edit',
    component: SixtyBaseInformationPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'EDIT_SIXTY_BASE_INFORMATION'],
        pageTitle: 'niopdcgatewayApp.sixtyBaseInformation.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/delete',
    component: SixtyBaseInformationDeletePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'DELETE_SIXTY_BASE_INFORMATION'],
        pageTitle: 'niopdcgatewayApp.sixtyBaseInformation.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
      path: ':id/:view',
      component: SixtyBaseInformationPopupComponent,
      data: {
          authorities: ['ROLE_ADMIN', 'VIEW_SIXTY_BASE_INFORMATION'],
          pageTitle: 'niopdcgatewayApp.sixtyBaseInformation.home.title'
      },
      canActivate: [UserRouteAccessService],
      outlet: 'popup'
  }
];
