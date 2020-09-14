import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import {CustomerComponent} from './customer.component';

export const customerRoute: Routes = [
    {
        path: 'report/customer',
        component: CustomerComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_REPORT_DAILY_SALES'],
            pageTitle: 'niopdcgatewayApp.dailySales.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
