import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import {DetailsBuyComponent} from './details-buy.component';

export const detailsBuyRoute: Routes = [
    {
        path: 'report/details-buy',
        component: DetailsBuyComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_REPORT_DETAILS_BUY'],
            pageTitle: 'niopdcgatewayApp.detailsBuy.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
