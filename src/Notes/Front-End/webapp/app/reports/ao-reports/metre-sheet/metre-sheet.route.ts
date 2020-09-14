import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import {MetreSheetAoComponent} from './metre-sheet-ao.component';
import {MetreSheetDepotComponent} from "app/reports/ao-reports/metre-sheet/metre-sheet-depot.component";

export const metreSheetRoute: Routes = [
    {
        path: 'report/metre-sheet/ao',
        component: MetreSheetAoComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_REPORT_METRE_SHEET_AO'],
            pageTitle: 'niopdcgatewayApp.metreSheet.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'report/metre-sheet/depot',
        component: MetreSheetDepotComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_REPORT_METRE_SHEET_DEPOT'],
            pageTitle: 'niopdcgatewayApp.metreSheet.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
