import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    CustomerTypeService,
    CustomerTypePopupService,
    CustomerTypeComponent,
    CustomerTypeDialogComponent,
    CustomerTypePopupComponent,
    CustomerTypeDeletePopupComponent,
    CustomerTypeDeleteDialogComponent,
    customerTypeRoute,
    customerTypePopupRoute,
    CustomerTypeResolvePagingParams,
} from './';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from '../../core/language.helper';


const ENTITY_STATES = [
    ...customerTypeRoute,
    ...customerTypePopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CustomerTypeComponent,
        CustomerTypeDialogComponent,
        CustomerTypeDeleteDialogComponent,
        CustomerTypePopupComponent,
        CustomerTypeDeletePopupComponent,
    ],
    entryComponents: [
        CustomerTypeComponent,
        CustomerTypeDialogComponent,
        CustomerTypePopupComponent,
        CustomerTypeDeleteDialogComponent,
        CustomerTypeDeletePopupComponent,
    ],
    providers: [
        CustomerTypeService,
        CustomerTypePopupService,
        CustomerTypeResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayCustomerTypeModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }}
