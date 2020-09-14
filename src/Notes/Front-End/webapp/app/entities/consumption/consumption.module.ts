import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    ConsumptionService,
    ConsumptionPopupService,
    ConsumptionComponent,
    ConsumptionDialogComponent,
    ConsumptionPopupComponent,
    ConsumptionDeletePopupComponent,
    ConsumptionDeleteDialogComponent,
    consumptionRoute,
    consumptionPopupRoute,
    ConsumptionResolvePagingParams,
} from './';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core/language.helper';
const ENTITY_STATES = [
    ...consumptionRoute,
    ...consumptionPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ConsumptionComponent,
        ConsumptionDialogComponent,
        ConsumptionDeleteDialogComponent,
        ConsumptionPopupComponent,
        ConsumptionDeletePopupComponent,
    ],
    entryComponents: [
        ConsumptionComponent,
        ConsumptionDialogComponent,
        ConsumptionPopupComponent,
        ConsumptionDeleteDialogComponent,
        ConsumptionDeletePopupComponent,
    ],
    providers: [
        { provide: JhiLanguageService, useClass: JhiLanguageService },
        ConsumptionService,
        ConsumptionPopupService,
        ConsumptionResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayConsumptionModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
