import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {InfringementComponent} from './infringement.component';
import {InfringementPopupComponent} from './infringement-dialog.component';
import {InfringementDeActivePopupComponent} from 'app/entities/infringement/infringement-deActive-dialog.component';
import {InfringementDeletePopupComponent} from 'app/entities/infringement/infringement-delete-dialog.component';
import {InfringementReportComponent} from 'app/entities/infringement/infringement-report.component';

@Injectable({providedIn: 'root'})
export class InfringementResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const size = route.queryParams['size'] ? route.queryParams['size'] : ITEMS_PER_PAGE;
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,desc';
        return {
            page: this.paginationUtil.parsePage(page),
            size: this.paginationUtil.parsePage(size),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
        };
    }
}

export const infringementRoute: Routes = [
    {
        path: 'print',
        component: InfringementReportComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'PRINT_INFRINGEMENT'],
            pageTitle: 'niopdcgatewayApp.infringement.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: '',
        component: InfringementComponent,
        resolve: {
            'pagingParams': InfringementResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_INFRINGEMENT'],
            pageTitle: 'niopdcgatewayApp.infringement.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const infringementPopupRoute: Routes = [
    {
        path: 'new',
        component: InfringementPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_INFRINGEMENT'],
            pageTitle: 'niopdcgatewayApp.infringement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit',
        component: InfringementPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_INFRINGEMENT'],
            pageTitle: 'niopdcgatewayApp.infringement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/deActive',
        component: InfringementDeActivePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DE_ACTIVE_INFRINGEMENT'],
            pageTitle: 'niopdcgatewayApp.infringement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: InfringementDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_INFRINGEMENT'],
            pageTitle: 'niopdcgatewayApp.infringement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:view',
        component: InfringementPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_INFRINGEMENT'],
            pageTitle: 'niopdcgatewayApp.infringement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
