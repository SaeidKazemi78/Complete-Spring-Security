import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    CostElementService,
    CostElementPopupService,
    CostElementComponent,
    CostElementDialogComponent,
    CostElementPopupComponent,
    CostElementDeletePopupComponent,
    CostElementDeleteDialogComponent,
    costElementRoute,
    costElementPopupRoute,
    CostElementResolvePagingParams,
} from './';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core/language.helper';
const ENTITY_STATES = [
    ...costElementRoute,
    ...costElementPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CostElementComponent,
        CostElementDialogComponent,
        CostElementDeleteDialogComponent,
        CostElementPopupComponent,
        CostElementDeletePopupComponent,
    ],
    entryComponents: [
        CostElementComponent,
        CostElementDialogComponent,
        CostElementPopupComponent,
        CostElementDeleteDialogComponent,
        CostElementDeletePopupComponent,
    ],
    providers: [
        { provide: JhiLanguageService, useClass: JhiLanguageService },
        CostElementService,
        CostElementPopupService,
        CostElementResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayCostElementModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
