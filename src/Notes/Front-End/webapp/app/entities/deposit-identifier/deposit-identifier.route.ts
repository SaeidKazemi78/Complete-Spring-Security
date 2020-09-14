import { Routes } from '@angular/router';
import {DepositIdentifierPopupComponent} from './deposit-identifier-dialog.component';
import {UserRouteAccessService} from '../../shared';

export const depositIdentifierPopupRoute: Routes = [
    {
        path: 'deposit-identifier',
        component: DepositIdentifierPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_DEPOSIT_IDENTIFIER_PERSON', 'LIST_DEPOSIT_IDENTIFIER_LOCATION', 'LIST_DEPOSIT_IDENTIFIER_CUSTOMER'],
            pageTitle: 'niopdcgatewayApp.depositIdentifier.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
];
