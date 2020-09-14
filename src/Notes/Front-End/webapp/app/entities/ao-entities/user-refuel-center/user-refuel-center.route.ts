import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';
import {JhiPaginationUtil} from 'ng-jhipster';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../../shared';
import {UserRefuelCenterPopupComponent} from './user-refuel-center-dialog.component';

@Injectable({ providedIn: 'root' })
export class UserRefuelCenterResolvePagingParams implements Resolve<any> {

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
export const userRefuelCenterPopupRoute: Routes = [
    {
        path: 'user-refuel-center/:username',
        component: UserRefuelCenterPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_REFUEL_CENTER_USER'],
            pageTitle: 'niopdcgatewayApp.userRefuelCenter.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
    ];
