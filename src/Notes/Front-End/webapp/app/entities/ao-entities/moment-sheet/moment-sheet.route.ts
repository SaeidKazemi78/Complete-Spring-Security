import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';
import {MomentSheetComponent} from './moment-sheet.component';

@Injectable({ providedIn: 'root' })
export class MomentSheetsResolvePagingParams implements Resolve<any> {

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

export const momentSheetRoute: Routes = [
    {
        path: 'moment-sheets',
        component: MomentSheetComponent,
        resolve: {
            'pagingParams': MomentSheetsResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_MOMENT_SHEETS'],
            pageTitle: 'niopdcgatewayApp.momentSheets.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
