import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { ITEMS_PER_PAGE, UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ExportLetterComponent } from './export-letter.component';
import { ExportLetterPopupComponent } from './export-letter-dialog.component';
import { ExportLetterDeletePopupComponent } from './export-letter-delete-dialog.component';
import {ExportLetterActivePopupComponent} from 'app/entities/export-letter/export-letter-active-dialog.component';

@Injectable({providedIn: 'root'})
export class ExportLetterResolvePagingParams implements Resolve<any> {

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

export const exportLetterRoute: Routes = [
    {
        path: '',
        component: ExportLetterComponent,
        resolve: {
            'pagingParams': ExportLetterResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_EXPORT_LETTER'],
            pageTitle: 'niopdcgatewayApp.exportLetter.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const exportLetterPopupRoute: Routes = [
  {
    path: 'new',
    component: ExportLetterPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'CREATE_EXPORT_LETTER'],
        pageTitle: 'niopdcgatewayApp.exportLetter.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/edit',
    component: ExportLetterPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'EDIT_EXPORT_LETTER'],
        pageTitle: 'niopdcgatewayApp.exportLetter.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/active',
    component: ExportLetterActivePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'ACTIVE_EXPORT_LETTER'],
        pageTitle: 'niopdcgatewayApp.exportLetter.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/delete',
    component: ExportLetterDeletePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'DELETE_EXPORT_LETTER'],
        pageTitle: 'niopdcgatewayApp.exportLetter.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
      path: ':id/:view',
      component: ExportLetterPopupComponent,
      data: {
          authorities: ['ROLE_ADMIN', 'VIEW_EXPORT_LETTER'],
          pageTitle: 'niopdcgatewayApp.exportLetter.home.title'
      },
      canActivate: [UserRouteAccessService],
      outlet: 'popup'
  }
];
