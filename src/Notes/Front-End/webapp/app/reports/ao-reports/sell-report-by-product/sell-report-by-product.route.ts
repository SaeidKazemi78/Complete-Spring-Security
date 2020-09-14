import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import {SellReportByProductComponent} from './sell-report-by-product.component';

export const sellReportByProductRoute: Routes = [
    {
        path: 'report/sell-report-by-products',
        component: SellReportByProductComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_SELL_REPORT_BY_PRODUCT'],
            pageTitle: 'niopdcgatewayApp.sellReportByProduct.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
