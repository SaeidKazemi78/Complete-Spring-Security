import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import {BrandSellComponent} from './brand-sell.component';

export const brandSellRoute: Routes = [
    {
        path: 'report/brand-sell',
        component: BrandSellComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_REPORT_BRAND_SELL'],
            pageTitle: 'niopdcgatewayApp.detailsBuy.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
