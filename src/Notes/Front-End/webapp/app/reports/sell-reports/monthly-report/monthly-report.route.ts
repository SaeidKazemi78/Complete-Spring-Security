import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import {MonthlyReportComponent} from './monthly-report.component';

export const monthlyReportRoute: Routes = [
    {
        path: 'report/monthly-report',
        component: MonthlyReportComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_REPORT_MONTHLY'],
            pageTitle: 'niopdcgatewayApp.monthlyReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
