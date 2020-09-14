import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import {DailySalesStatisticalComponent} from './daily-sales-statistical.component';

export const dailySalesStatisticalRoute: Routes = [
    {
        path: 'report/daily-sales-statistical',
        component: DailySalesStatisticalComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_REPORT_DAILY_SALES_STATISTICAL'],
            pageTitle: 'niopdcgatewayApp.dailySalesStatistical.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
