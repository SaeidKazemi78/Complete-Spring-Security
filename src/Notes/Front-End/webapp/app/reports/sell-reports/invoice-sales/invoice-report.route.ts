import {Routes} from '@angular/router';

import {UserRouteAccessService} from '../../../shared';
import {InvoiceSellReportComponent} from './invoice-report.component';

export const InvoiceSellReportRoute: Routes = [
    {
        path: 'report/invoice-sell-report',
        component: InvoiceSellReportComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_REPORT_INVOICE_SALES'],
            pageTitle: 'niopdcgatewayApp.invoiceSell.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
