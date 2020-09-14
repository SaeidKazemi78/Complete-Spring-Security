import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import {PlatformComponent} from './platform.component';

export const platformRoute: Routes = [
    {
        path: 'report/platforms',
        component: PlatformComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_REPORT_PLATFORM'],
            pageTitle: 'niopdcgatewayApp.platformReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
