import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import {DailySalesComponent} from './daily-sales.component';

export const dailySalesRoute: Routes = [
    {
        path: 'report/daily-sales',
        component: DailySalesComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_REPORT_DAILY_SALES'],
            pageTitle: 'niopdcgatewayApp.dailySales.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
