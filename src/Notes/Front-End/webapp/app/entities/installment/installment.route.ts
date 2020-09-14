import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { InstallmentComponent } from './installment.component';
import {InstallmentPaymentComponent} from './installment-payment.component';

export const installmentRoute: Routes = [
    {
        path: '',
        component: InstallmentComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_LOAN_INSTALLMENT'],
            pageTitle: 'niopdcgatewayApp.installment.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'payment/:payId',
        component: InstallmentPaymentComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'LOAN_INSTALLMENT_PAYMENT'],
            pageTitle: 'niopdcgatewayApp.installment.home.titlePayment'
        },
        canActivate: [UserRouteAccessService]
    }
];
