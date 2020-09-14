import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    SafetyCardService,
    SafetyCardPopupService,
    SafetyCardComponent,
    SafetyCardDialogComponent,
    SafetyCardPopupComponent,
    SafetyCardDeletePopupComponent,
    SafetyCardDeleteDialogComponent,
    safetyCardRoute,
    safetyCardPopupRoute,
    SafetyCardResolvePagingParams,
} from './';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core/language.helper';

const ENTITY_STATES = [
    ...safetyCardRoute,
    ...safetyCardPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SafetyCardComponent,
        SafetyCardDialogComponent,
        SafetyCardDeleteDialogComponent,
        SafetyCardPopupComponent,
        SafetyCardDeletePopupComponent,
    ],
    entryComponents: [
        SafetyCardComponent,
        SafetyCardDialogComponent,
        SafetyCardPopupComponent,
        SafetyCardDeleteDialogComponent,
        SafetyCardDeletePopupComponent,
    ],
    providers: [
        SafetyCardService,
        SafetyCardPopupService,
        SafetyCardResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewaySafetyCardModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
