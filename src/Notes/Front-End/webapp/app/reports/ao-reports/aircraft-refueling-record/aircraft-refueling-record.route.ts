import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import {AircraftRefuelingRecordComponent} from './aircraft-refueling-record.component';

export const aircraftRefuelingRecordRoute: Routes = [
    {
        path: 'report/aircraft-refueling-records',
        component: AircraftRefuelingRecordComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_AIRCRAFT_REFUELING_RECORD'],
            pageTitle: 'niopdcgatewayApp.aircraftRefuelingRecord.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
