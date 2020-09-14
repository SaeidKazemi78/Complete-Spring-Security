import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import {ConsumptionComponent} from './consumption.component';

export const consumptionRoute: Routes = [
    {
        path: 'report/consumption',
        component: ConsumptionComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_REPORT_CONSUMPTION'],
            pageTitle: 'niopdcgatewayApp.consumption.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
