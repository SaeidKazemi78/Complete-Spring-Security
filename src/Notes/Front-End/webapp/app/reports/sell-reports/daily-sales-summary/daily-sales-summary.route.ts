import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import {DailySalesSummaryComponent} from './daily-sales-summary.component';

export const dailySalesSummaryRoute: Routes = [
    {
        path: 'report/daily-sales-summary',
        component: DailySalesSummaryComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_REPORT_DAILY_SALES_SUMMARY'],
            pageTitle: 'niopdcgatewayApp.dailySalesSummary.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
