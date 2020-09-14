import {Injectable} from '@angular/core';
import {Routes} from '@angular/router';
import {JhiPaginationUtil} from 'ng-jhipster';

import {UserRouteAccessService} from '../../shared';
import {CustomerAccountingComponent} from './customer-accounting.component';

export const customerAccountingRoute: Routes = [
    {
        path: '',
        component: CustomerAccountingComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_CUSTOMER_ACCOUNTING'],
            pageTitle: 'niopdcgatewayApp.customerAccounting.home.title'
        },
        canActivate: [UserRouteAccessService],
    }
];
