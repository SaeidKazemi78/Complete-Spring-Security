import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import {SellProductToCompanyComponent} from './sell-product-to-company.component';

export const sellProductToCompanyRoute: Routes = [
    {
        path: 'report/sell-product-to-company',
        component: SellProductToCompanyComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_SELL_PRODUCT_TO_COMPANY'],
            pageTitle: 'niopdcgatewayApp.sellReportByProduct.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
