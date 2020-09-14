import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../../shared/index';
import {JhiPaginationUtil} from 'ng-jhipster';

import {LiteratureVolumeOilTankComponent} from './literature-volume-oil-tank.component';
import {LiteratureVolumeOilTankPopupComponent} from './literature-volume-oil-tank-dialog.component';
import {LiteratureVolumeOilTankDeletePopupComponent} from './literature-volume-oil-tank-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class LiteratureVolumeOilTankResolvePagingParams implements Resolve<any> {

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

export const literatureVolumeOilTankRoute: Routes = [
    {
        path: '',
        component: LiteratureVolumeOilTankComponent,
        resolve: {
            'pagingParams': LiteratureVolumeOilTankResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_LITERATURE_VOLUME_OIL_TANK'],
            pageTitle: 'niopdcgatewayApp.literatureVolumeOilTank.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const literatureVolumeOilTankPopupRoute: Routes = [
    {
        path: 'new/oil-tank/:oilTankId',
        component: LiteratureVolumeOilTankPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_LITERATURE_VOLUME_OIL_TANK'],
            pageTitle: 'niopdcgatewayApp.literatureVolumeOilTank.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'new/service-oil-tank/:serviceOilTankId',
        component: LiteratureVolumeOilTankPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_LITERATURE_VOLUME_OIL_TANK'],
            pageTitle: 'niopdcgatewayApp.literatureVolumeOilTank.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:parent/:parentId/edit',
        component: LiteratureVolumeOilTankPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_LITERATURE_VOLUME_OIL_TANK'],
            pageTitle: 'niopdcgatewayApp.literatureVolumeOilTank.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: LiteratureVolumeOilTankDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_LITERATURE_VOLUME_OIL_TANK'],
            pageTitle: 'niopdcgatewayApp.literatureVolumeOilTank.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:parent/:parentId/:view',
        component: LiteratureVolumeOilTankPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_LITERATURE_VOLUME_OIL_TANK'],
            pageTitle: 'niopdcgatewayApp.literatureVolumeOilTank.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
