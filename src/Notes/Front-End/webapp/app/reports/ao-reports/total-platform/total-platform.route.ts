import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import {TotalPlatformComponent} from './total-platform.component';

export const totalPlatformRoute: Routes = [
    {
        path: 'report/total-platforms',
        component: TotalPlatformComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_TOTAL_PLATFORM'],
            pageTitle: 'niopdcgatewayApp.totalSell.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
