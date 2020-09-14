import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import {BillWithoutContainerComponent} from './bill-without-container.component';

export const billWithoutContainerRoute: Routes = [
    {
        path: 'report/bill-without-containers',
        component: BillWithoutContainerComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_BILL_WITHOUT_CONTAINER'],
            pageTitle: 'niopdcgatewayApp.billWithoutContainer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
