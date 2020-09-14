import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import {DecompositionComponent} from './decomposition.component';

export const decompositionRoute: Routes = [
    {
        path: 'report/decomposition',
        component: DecompositionComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_REPORT_DECOMPOSITION'],
            pageTitle: 'niopdcgatewayApp.decomposition.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
