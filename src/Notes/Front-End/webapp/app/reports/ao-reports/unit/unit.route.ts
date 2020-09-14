import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import {UnitComponent} from './unit.component';

export const unitRoute: Routes = [
    {
        path: 'report/units',
        component: UnitComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_REPORT_UNIT'],
            pageTitle: 'niopdcgatewayApp.unit.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
