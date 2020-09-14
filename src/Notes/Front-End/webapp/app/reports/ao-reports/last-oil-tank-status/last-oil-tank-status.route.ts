import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/shared';
import {LastOilTankStatusComponent} from './last-oil-tank-status.component';

export const lastOilTankStatusRoute: Routes = [
    {
        path: 'report/last-oil-tank-status',
        component: LastOilTankStatusComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_AIRPORT'],
            pageTitle: 'niopdcgatewayApp.airport.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
