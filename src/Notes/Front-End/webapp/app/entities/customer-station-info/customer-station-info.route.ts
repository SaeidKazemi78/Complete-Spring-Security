import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { ITEMS_PER_PAGE, UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CustomerStationInfoPopupComponent } from './customer-station-info-dialog.component';
import {CustomerStationInfoReportComponent} from '../../reports/sell-reports/customer-station-info-report/customer-station-info-report.component';

@Injectable({ providedIn: 'root' })
export class CustomerStationInfoResolvePagingParams implements Resolve<any> {

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

export const customerStationInfoRoute: Routes = [

];

export const customerStationInfoPopupRoute: Routes = [
  {
    path: 'new/:customerId',
    component: CustomerStationInfoPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'CREATE_CUSTOMER_STATION_INFO'],
        pageTitle: 'niopdcgatewayApp.customerStationInfo.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/customer-station-info',
    component: CustomerStationInfoPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'EDIT_CUSTOMER_STATION_INFO'],
        pageTitle: 'niopdcgatewayApp.customerStationInfo.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
