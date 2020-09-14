import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    CustomerCreditService,
    CustomerCreditPopupService,
    CustomerCreditComponent,
    CustomerCreditDialogComponent,
    CustomerCreditPopupComponent,
    CustomerCreditDeletePopupComponent,
    CustomerCreditDeleteDialogComponent,
    customerCreditRoute,
    customerCreditPopupRoute,
    CustomerCreditResolvePagingParams,
} from './';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {customerPopupRoute} from 'app/entities/customer';

const ENTITY_STATES = [
    ...customerCreditRoute,
    ...customerCreditPopupRoute
];
// customer/:customerId/customer-credit/:customerCreditId/ceiling-quota
@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CustomerCreditComponent,
        CustomerCreditDialogComponent,
        CustomerCreditDeleteDialogComponent,
        CustomerCreditPopupComponent,
        CustomerCreditDeletePopupComponent,
    ],
    entryComponents: [
        CustomerCreditComponent,
        CustomerCreditDialogComponent,
        CustomerCreditPopupComponent,
        CustomerCreditDeleteDialogComponent,
        CustomerCreditDeletePopupComponent,
    ],
    providers: [
        { provide: JhiLanguageService, useClass: JhiLanguageService },
        CustomerCreditService,
        CustomerCreditPopupService,
        CustomerCreditResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayCustomerCreditModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
