import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';
import {JhiPaginationUtil} from 'ng-jhipster';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {CountryComponent} from './country.component';
import {CountryPopupComponent} from './country-dialog.component';
import {CountryDeletePopupComponent} from './country-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class CountryResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const size = route.queryParams['size'] ? route.queryParams['size'] : ITEMS_PER_PAGE;
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'name,desc';
        return {
            page: this.paginationUtil.parsePage(page),
            size: this.paginationUtil.parsePage(size),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
        };
    }
}

export const countryRoute: Routes = [
    {
        path: '',
        component: CountryComponent,
        resolve: {
            'pagingParams': CountryResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_REGION'],
            pageTitle: 'niopdcgatewayApp.country.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':countryId/region',
        loadChildren: '../region/region.module#NiopdcgatewayRegionModule'
    },
];

export const countryPopupRoute: Routes = [
    {
        path: 'new',
        component: CountryPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_REGION'],
            pageTitle: 'niopdcgatewayApp.country.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit',
        component: CountryPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_REGION'],
            pageTitle: 'niopdcgatewayApp.country.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: CountryDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_REGION'],
            pageTitle: 'niopdcgatewayApp.country.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:view',
        component: CountryPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_REGION'],
            pageTitle: 'niopdcgatewayApp.country.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
