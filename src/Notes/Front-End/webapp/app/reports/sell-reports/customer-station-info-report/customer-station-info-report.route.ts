import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import {CustomerStationInfoReportComponent} from './customer-station-info-report.component';

export const customerStationInfoReportRoute: Routes = [
    {
        path: 'report/customer-station-info/:id',
        component: CustomerStationInfoReportComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_REPORT_CONSUMPTION'],
            pageTitle: 'niopdcgatewayApp.consumption.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
