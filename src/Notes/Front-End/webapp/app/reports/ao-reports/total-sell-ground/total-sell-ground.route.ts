import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import {TotalSellGroundComponent} from './total-sell-ground.component';

export const totalSellGroundRoute: Routes = [
    {
        path: 'report/total-sell-grounds',
        component: TotalSellGroundComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_TOTAL_SELL_GROUND'],
            pageTitle: 'niopdcgatewayApp.totalSellGround.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
