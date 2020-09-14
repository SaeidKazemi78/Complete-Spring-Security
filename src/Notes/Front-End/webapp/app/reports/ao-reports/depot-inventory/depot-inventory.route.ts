import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import {DepotInventoryComponent} from './depot-inventory.component';

export const depotInventoryRoute: Routes = [
    {
        path: 'report/depot-inventory',
        component: DepotInventoryComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_DEPOT_INVENTORY'],
            pageTitle: 'niopdcgatewayApp.depotInventory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
