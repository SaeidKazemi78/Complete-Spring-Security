import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import {AoMountReportComponent} from './ao-mount-report.component';

export const AoMountReportRoute: Routes = [
    {
        path: 'report/ao-mount-reports',
        component: AoMountReportComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_AO_MOUNT_REPORT'],
            pageTitle: 'niopdcgatewayApp.AoMountReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
