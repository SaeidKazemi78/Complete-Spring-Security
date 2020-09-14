import {Routes} from '@angular/router';

import {UserRouteAccessService} from '../../../shared';
import {MomentSheetAoComponent} from './moment-sheet-ao.component';
import {MomentSheetDepotComponent} from './moment-sheet-depot.component';
import {DepotMomentSheetComponent} from './depot-moment-sheet.component';
import {GroundMomentSheetComponent} from './ground-moment-sheet.component';

export const momentSheetRoute: Routes = [
    {
        path: 'report/moment-sheet/ao',
        component: MomentSheetAoComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_REPORT_MOMENT_SHEET_AO'],
            pageTitle: 'niopdcgatewayApp.momentSheet.home.aoTitle'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'report/moment-sheet/depot',
        component: MomentSheetDepotComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_REPORT_MOMENT_SHEET_DEPOT'],
            pageTitle: 'niopdcgatewayApp.momentSheet.home.depotTitle'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'report/depot-moment-sheet/depot',
        component: DepotMomentSheetComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_REPORT_MOMENT_SHEET_DEPOT'],
            pageTitle: 'niopdcgatewayApp.momentSheet.home.depotTitle'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'report/ground-moment-sheet',
        component: GroundMomentSheetComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_REPORT_MOMENT_SHEET_DEPOT'],
            pageTitle: 'niopdcgatewayApp.momentSheet.home.depotTitle'
        },
        canActivate: [UserRouteAccessService]
    }
];
