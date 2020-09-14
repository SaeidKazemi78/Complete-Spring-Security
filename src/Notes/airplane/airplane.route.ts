import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import {AirplaneComponent} from './airplane.component';

export const airplaneRoute: Routes = [
    {
        path: 'report/airplanes',
        component: AirplaneComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_AIR_PLANE'],
            pageTitle: 'niopdcgatewayApp.airplane.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
