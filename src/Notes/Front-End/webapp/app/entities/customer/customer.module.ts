import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    CustomerService,
    CustomerPopupService,
    CustomerComponent,
    CustomerDialogComponent,
    CustomerPopupComponent,
    CustomerDeletePopupComponent,
    CustomerDeleteDialogComponent,
    customerRoute,
    customerPopupRoute,
    CustomerResolvePagingParams
} from './';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {CustomerCreditAccountDialogComponent, CustomerCreditAccountPopupComponent} from './customer-credit-account-dialog.component';
import {NiopdcgatewayDepositIdentifierModule} from 'app/entities/deposit-identifier/deposit-identifier.module';
import {NiopdcgatewayCustomerStationInfoModule} from 'app/entities/customer-station-info/customer-station-info.module';
import {CustomerBoundaryArchiveDialogComponent, CustomerBoundaryArchivePopupComponent} from 'app/entities/customer/boundary-customer-archive-dialog.component';

const ENTITY_STATES = [
    ...customerRoute,
    ...customerPopupRoute,
    {
        path: ':customerId/customer-credit',
        loadChildren: '../customer-credit/customer-credit.module#NiopdcgatewayCustomerCreditModule'
    },
    {
        path: ':customerId/transport-contract',
        loadChildren: '../transport-contract/transport-contract.module#NiopdcgatewayTransportContractModule'
    },
    {
        path: ':customerId/customer-capacity',
        loadChildren: '../customer-capacity/customer-capacity.module#NiopdcgatewayCustomerCapacityModule'
    },
    {
        path: ':customerId/customer-score',
        loadChildren: '../customer-score/customer-score.module#NiopdcgatewayCustomerScoreModule'
    },
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        NiopdcgatewayDepositIdentifierModule,
        NiopdcgatewayCustomerStationInfoModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CustomerComponent,
        CustomerDialogComponent,
        CustomerDeleteDialogComponent,
        CustomerPopupComponent,
        CustomerDeletePopupComponent,
        CustomerCreditAccountDialogComponent,
        CustomerCreditAccountPopupComponent,

    ],
    entryComponents: [
        CustomerComponent,
        CustomerDialogComponent,
        CustomerPopupComponent,
        CustomerDeleteDialogComponent,
        CustomerDeletePopupComponent,
        CustomerCreditAccountDialogComponent,
        CustomerCreditAccountPopupComponent,


    ],
    providers: [
        { provide: JhiLanguageService, useClass: JhiLanguageService },
        CustomerService,
        CustomerPopupService,
        CustomerResolvePagingParams
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayCustomerModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
