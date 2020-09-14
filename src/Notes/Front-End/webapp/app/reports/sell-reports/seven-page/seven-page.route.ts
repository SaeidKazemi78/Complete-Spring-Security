import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import {SevenPageComponent} from './seven-page.component';

export const sevenPageRoute: Routes = [
    {
        path: 'report/seven-page',
        component: SevenPageComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_REPORT_SEVEN_PAGE'],
            pageTitle: 'niopdcgatewayApp.sevenPage.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
