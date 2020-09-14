import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { SalesCodeComponent } from './sales-code.component';
import { SalesCodeDetailComponent } from './sales-code-detail.component';
import { SalesCodePopupComponent } from './sales-code-dialog.component';
import { SalesCodeDeletePopupComponent } from './sales-code-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class SalesCodeResolvePagingParams implements Resolve<any> {

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

export const salesCodeRoute: Routes = [
    {
        path: 'sales-code',
        component: SalesCodeComponent,
        resolve: {
            'pagingParams': SalesCodeResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'niopdcgatewayApp.salesCode.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'sales-code/:id',
        component: SalesCodeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'niopdcgatewayApp.salesCode.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const salesCodePopupRoute: Routes = [
    {
        path: 'sales-code-new',
        component: SalesCodePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'niopdcgatewayApp.salesCode.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'sales-code/:id/edit',
        component: SalesCodePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'niopdcgatewayApp.salesCode.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'sales-code/:id/delete',
        component: SalesCodeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'niopdcgatewayApp.salesCode.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
