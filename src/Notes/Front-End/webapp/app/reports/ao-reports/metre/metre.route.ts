import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import {MetreComponent} from './metre.component';

export const metreRoute: Routes = [
    {
        path: 'report/metres',
        component: MetreComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_REPORT_METRE'],
            pageTitle: 'niopdcgatewayApp.metre.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
