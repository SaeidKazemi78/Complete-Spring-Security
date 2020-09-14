import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { ITEMS_PER_PAGE, UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { DangerousCertificateComponent } from './dangerous-certificate.component';
import { DangerousCertificatePopupComponent } from './dangerous-certificate-dialog.component';
import { DangerousCertificateDeletePopupComponent } from './dangerous-certificate-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class DangerousCertificateResolvePagingParams implements Resolve<any> {

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

export const dangerousCertificateRoute: Routes = [
    {
        path: '',
        component: DangerousCertificateComponent,
        resolve: {
            'pagingParams': DangerousCertificateResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_DANGEROUS_CERTIFICATE'],
            pageTitle: 'niopdcgatewayApp.dangerousCertificate.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const dangerousCertificatePopupRoute: Routes = [
  {
    path: 'new/:driverId',
    component: DangerousCertificatePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'CREATE_DANGEROUS_CERTIFICATE'],
        pageTitle: 'niopdcgatewayApp.dangerousCertificate.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/edit',
    component: DangerousCertificatePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'EDIT_DANGEROUS_CERTIFICATE'],
        pageTitle: 'niopdcgatewayApp.dangerousCertificate.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/delete',
    component: DangerousCertificateDeletePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'DELETE_DANGEROUS_CERTIFICATE'],
        pageTitle: 'niopdcgatewayApp.dangerousCertificate.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
      path: ':id/:view',
      component: DangerousCertificatePopupComponent,
      data: {
          authorities: ['ROLE_ADMIN', 'VIEW_DANGEROUS_CERTIFICATE'],
          pageTitle: 'niopdcgatewayApp.dangerousCertificate.home.title'
      },
      canActivate: [UserRouteAccessService],
      outlet: 'popup'
  }
];
