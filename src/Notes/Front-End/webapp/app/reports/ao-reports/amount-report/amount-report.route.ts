import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import {AmountReportComponent} from './amount-report.component';

export const amountReportRoute: Routes = [
    {
        path: 'report/amount-reports',
        component: AmountReportComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_AMOUNT_REPORT'],
            pageTitle: 'niopdcgatewayApp.amountReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
