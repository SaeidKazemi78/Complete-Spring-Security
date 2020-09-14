import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    ProductStepService,
    ProductStepPopupService,
    ProductStepComponent,
    ProductStepDialogComponent,
    ProductStepPopupComponent,
    ProductStepDeletePopupComponent,
    ProductStepDeleteDialogComponent,
    productStepRoute,
    productStepPopupRoute,
    ProductStepResolvePagingParams,
} from './';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core/language.helper';

const ENTITY_STATES = [
    ...productStepRoute,
    ...productStepPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ProductStepComponent,
        ProductStepDialogComponent,
        ProductStepDeleteDialogComponent,
        ProductStepPopupComponent,
        ProductStepDeletePopupComponent,
    ],
    entryComponents: [
        ProductStepComponent,
        ProductStepDialogComponent,
        ProductStepPopupComponent,
        ProductStepDeleteDialogComponent,
        ProductStepDeletePopupComponent,
    ],
    providers: [
        ProductStepService,
        ProductStepPopupService,
        ProductStepResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayProductStepModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }}
