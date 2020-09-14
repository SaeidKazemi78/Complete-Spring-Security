import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { SealUseComponent } from './seal-use.component';
import { SealUseDetailComponent } from './seal-use-detail.component';
import { SealUsePopupComponent } from './seal-use-dialog.component';
import { SealUseDeletePopupComponent } from './seal-use-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class SealUseResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const sealUseRoute: Routes = [
    {
        path: 'seal-use',
        component: SealUseComponent,
        resolve: {
            'pagingParams': SealUseResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'niopdcgatewayApp.sealUse.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'seal-use/:id',
        component: SealUseDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'niopdcgatewayApp.sealUse.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sealUsePopupRoute: Routes = [
    {
        path: 'seal-use-new',
        component: SealUsePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'niopdcgatewayApp.sealUse.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'seal-use/:id/edit',
        component: SealUsePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'niopdcgatewayApp.sealUse.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'seal-use/:id/delete',
        component: SealUseDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'niopdcgatewayApp.sealUse.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
