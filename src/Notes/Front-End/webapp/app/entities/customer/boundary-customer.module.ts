import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    CustomerService,
    CustomerPopupService,
    CustomerResolvePagingParams,
    BoundaryCustomerResolvePagingParams,
} from './';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {BoundaryCustomerComponent} from './boundary-customer.component';
import {CustomerBoundaryArchiveDialogComponent, CustomerBoundaryArchivePopupComponent} from './boundary-customer-archive-dialog.component';
import {NiopdcgatewayBoundaryCustomerPopupModule} from 'app/entities/customer/boundary-customer.popup.module';
import {boundaryCustomerPopupRoute,  boundaryCustomerRoute} from 'app/entities/customer/boundary-customer.route';
import {BoundaryCustomerDeleteDialogComponent, BoundaryCustomerDeletePopupComponent} from 'app/entities/customer/boundary-customer-delete-dialog.component';
import {BoundaryCustomerPlaqueChangeDialogComponent, BoundaryCustomerPlaqueChangePopupComponent} from 'app/entities/customer/boundary-customer-plaque-change-dialog.component';

const ENTITY_STATES = [
    ...boundaryCustomerRoute,
    ...boundaryCustomerPopupRoute,
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
        NiopdcgatewayBoundaryCustomerPopupModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CustomerBoundaryArchiveDialogComponent,
        CustomerBoundaryArchivePopupComponent,
        BoundaryCustomerDeleteDialogComponent,
        BoundaryCustomerDeletePopupComponent,
        BoundaryCustomerPlaqueChangeDialogComponent,
        BoundaryCustomerPlaqueChangePopupComponent,
        BoundaryCustomerComponent,
    ],
    entryComponents: [
        CustomerBoundaryArchiveDialogComponent,
        CustomerBoundaryArchivePopupComponent,
        BoundaryCustomerDeleteDialogComponent,
        BoundaryCustomerDeletePopupComponent,
        BoundaryCustomerPlaqueChangeDialogComponent,
        BoundaryCustomerPlaqueChangePopupComponent,
        BoundaryCustomerComponent,

    ],
    providers: [
        { provide: JhiLanguageService, useClass: JhiLanguageService },
        CustomerService,
        CustomerPopupService,
        CustomerResolvePagingParams,
        BoundaryCustomerResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayBoundaryCustomerModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
