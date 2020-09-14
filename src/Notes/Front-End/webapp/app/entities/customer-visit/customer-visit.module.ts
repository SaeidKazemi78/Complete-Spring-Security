import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    CustomerVisitService,
    CustomerVisitPopupService,
    CustomerVisitComponent,
    CustomerVisitDialogComponent,
    CustomerVisitPopupComponent,
    CustomerVisitDeletePopupComponent,
    CustomerVisitDeleteDialogComponent,
    customerVisitRoute,
    customerVisitPopupRoute,
    CustomerVisitResolvePagingParams,
} from './';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from '../../core/language.helper';

const ENTITY_STATES = [
    ...customerVisitRoute,
    ...customerVisitPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CustomerVisitComponent,
        CustomerVisitDialogComponent,
        CustomerVisitDeleteDialogComponent,
        CustomerVisitPopupComponent,
        CustomerVisitDeletePopupComponent,
    ],
    entryComponents: [
        CustomerVisitComponent,
        CustomerVisitDialogComponent,
        CustomerVisitPopupComponent,
        CustomerVisitDeleteDialogComponent,
        CustomerVisitDeletePopupComponent,
    ],
    providers: [
        CustomerVisitService,
        CustomerVisitPopupService,
        CustomerVisitResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayCustomerVisitModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
        if (languageKey) {
            this.languageService.changeLanguage(languageKey);
        }
    });
}}
