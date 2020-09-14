import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    CustomerDeactiveRuleService,
    CustomerDeactiveRulePopupService,
    CustomerDeactiveRuleComponent,
    CustomerDeactiveRuleDialogComponent,
    CustomerDeactiveRulePopupComponent,
    CustomerDeactiveRuleDeletePopupComponent,
    CustomerDeactiveRuleDeleteDialogComponent,
    customerDeactiveRuleRoute,
    customerDeactiveRulePopupRoute,
    CustomerDeactiveRuleResolvePagingParams,
} from './';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from '../../core/language.helper';

const ENTITY_STATES = [
    ...customerDeactiveRuleRoute,
    ...customerDeactiveRulePopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CustomerDeactiveRuleComponent,
        CustomerDeactiveRuleDialogComponent,
        CustomerDeactiveRuleDeleteDialogComponent,
        CustomerDeactiveRulePopupComponent,
        CustomerDeactiveRuleDeletePopupComponent,
    ],
    entryComponents: [
        CustomerDeactiveRuleComponent,
        CustomerDeactiveRuleDialogComponent,
        CustomerDeactiveRulePopupComponent,
        CustomerDeactiveRuleDeleteDialogComponent,
        CustomerDeactiveRuleDeletePopupComponent,
    ],
    providers: [
        CustomerDeactiveRuleService,
        CustomerDeactiveRulePopupService,
        CustomerDeactiveRuleResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayCustomerDeactiveRuleModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }}
