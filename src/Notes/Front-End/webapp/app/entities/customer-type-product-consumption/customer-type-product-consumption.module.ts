import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    CustomerTypeProductConsumptionService,
    CustomerTypeProductConsumptionPopupService,
    CustomerTypeProductConsumptionComponent,
    CustomerTypeProductConsumptionDialogComponent,
    CustomerTypeProductConsumptionPopupComponent,
    CustomerTypeProductConsumptionDeletePopupComponent,
    CustomerTypeProductConsumptionDeleteDialogComponent,
    customerTypeProductConsumptionRoute,
    customerTypeProductConsumptionPopupRoute,
    CustomerTypeProductConsumptionResolvePagingParams,
} from './';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core/language.helper';

const ENTITY_STATES = [
    ...customerTypeProductConsumptionRoute,
    ...customerTypeProductConsumptionPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CustomerTypeProductConsumptionComponent,
        CustomerTypeProductConsumptionDialogComponent,
        CustomerTypeProductConsumptionDeleteDialogComponent,
        CustomerTypeProductConsumptionPopupComponent,
        CustomerTypeProductConsumptionDeletePopupComponent,
    ],
    entryComponents: [
        CustomerTypeProductConsumptionComponent,
        CustomerTypeProductConsumptionDialogComponent,
        CustomerTypeProductConsumptionPopupComponent,
        CustomerTypeProductConsumptionDeleteDialogComponent,
        CustomerTypeProductConsumptionDeletePopupComponent,
    ],
    providers: [
        CustomerTypeProductConsumptionService,
        CustomerTypeProductConsumptionPopupService,
        CustomerTypeProductConsumptionResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayCustomerTypeProductConsumptionModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }}
