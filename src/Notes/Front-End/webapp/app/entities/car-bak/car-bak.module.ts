import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    CarBakService,
    CarBakPopupService,
    CarBakComponent,
    CarBakDialogComponent,
    CarBakPopupComponent,
    CarBakDeletePopupComponent,
    CarBakDeleteDialogComponent,
    carBakRoute,
    carBakPopupRoute,
    CarBakResolvePagingParams,
} from './';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core/language.helper';

const ENTITY_STATES = [
    ...carBakRoute,
    ...carBakPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CarBakComponent,
        CarBakDialogComponent,
        CarBakDeleteDialogComponent,
        CarBakPopupComponent,
        CarBakDeletePopupComponent,
    ],
    entryComponents: [
        CarBakComponent,
        CarBakDialogComponent,
        CarBakPopupComponent,
        CarBakDeleteDialogComponent,
        CarBakDeletePopupComponent,
    ],
    providers: [
        CarBakService,
        CarBakPopupService,
        CarBakResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayCarBakModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
