import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {WaterMethanolMixerComponent} from './water-methanol-mixer.component';
import {WaterMethanolMixerPopupComponent} from './water-methanol-mixer-dialog.component';
import {WaterMethanolMixerDeletePopupComponent} from './water-methanol-mixer-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class WaterMethanolMixerResolvePagingParams implements Resolve<any> {

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

export const waterMethanolMixerRoute: Routes = [
    {
        path: 'water-methanol-mixer',
        component: WaterMethanolMixerComponent,
        resolve: {
            'pagingParams': WaterMethanolMixerResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_WATER_METHANOL_MIXER'],
            pageTitle: 'niopdcgatewayApp.waterMethanolMixer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const waterMethanolMixerPopupRoute: Routes = [
    {
        path: 'water-methanol-mixer-new',
        component: WaterMethanolMixerPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_WATER_METHANOL_MIXER'],
            pageTitle: 'niopdcgatewayApp.waterMethanolMixer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'water-methanol-mixer/:id/edit',
        component: WaterMethanolMixerPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_WATER_METHANOL_MIXER'],
            pageTitle: 'niopdcgatewayApp.waterMethanolMixer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'water-methanol-mixer/:id/delete',
        component: WaterMethanolMixerDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_WATER_METHANOL_MIXER'],
            pageTitle: 'niopdcgatewayApp.waterMethanolMixer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'water-methanol-mixer/:id/:view',
        component: WaterMethanolMixerPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_WATER_METHANOL_MIXER'],
            pageTitle: 'niopdcgatewayApp.waterMethanolMixer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
