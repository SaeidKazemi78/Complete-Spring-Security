import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    PlaqueService,
    PlaquePopupService,
    PlaqueComponent,
    PlaqueDialogComponent,
    PlaquePopupComponent,
    PlaqueDeletePopupComponent,
    PlaqueDeleteDialogComponent,
    plaqueRoute,
    plaquePopupRoute,
    PlaqueResolvePagingParams,
} from './';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core/language.helper';

const ENTITY_STATES = [
    ...plaqueRoute,
    ...plaquePopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PlaqueComponent,
        PlaqueDialogComponent,
        PlaqueDeleteDialogComponent,
        PlaquePopupComponent,
        PlaqueDeletePopupComponent,
    ],
    entryComponents: [
        PlaqueComponent,
        PlaqueDialogComponent,
        PlaquePopupComponent,
        PlaqueDeleteDialogComponent,
        PlaqueDeletePopupComponent,
    ],
    providers: [
        PlaqueService,
        PlaquePopupService,
        PlaqueResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayPlaqueModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }}
