import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import {AirlineComponent} from './airline.component';

export const airlineRoute: Routes = [
    {
        path: 'report/airlines',
        component: AirlineComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_AIRLINE'],
            pageTitle: 'niopdcgatewayApp.airline.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
