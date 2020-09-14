import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';

import {ComparisonProductSellComponent} from './comparison-product-sell.component';

export const comparisonProductSellRoute: Routes = [
    {
        path: 'report/comparison-product-sell',
        component: ComparisonProductSellComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_REPORT_COMPARISON'],
            pageTitle: 'niopdcgatewayApp.comparisonProductSell.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
