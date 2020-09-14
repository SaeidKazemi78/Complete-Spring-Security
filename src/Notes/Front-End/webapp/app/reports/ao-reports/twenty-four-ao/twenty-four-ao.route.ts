import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import {TwentyFourAoComponent} from './twenty-four-ao.component';

export const twentyFourAoRoute: Routes = [
    {
        path: 'report/twenty-four-aos',
        component: TwentyFourAoComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_TWENTY_FOUR_AO'],
            pageTitle: 'niopdcgatewayApp.twentyFourAo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
