import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import {AirportComponent} from './airport.component';

export const airportRoute: Routes = [
    {
        path: 'report/airports',
        component: AirportComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_AIRPORT'],
            pageTitle: 'niopdcgatewayApp.airport.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
