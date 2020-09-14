import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    CostGroupService,
    CostGroupPopupService,
    CostGroupComponent,
    CostGroupDialogComponent,
    CostGroupPopupComponent,
    CostGroupDeletePopupComponent,
    CostGroupDeleteDialogComponent,
    costGroupRoute,
    costGroupPopupRoute,
    CostGroupResolvePagingParams,
} from './';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core/language.helper';

const ENTITY_STATES = [
    ...costGroupRoute,
    ...costGroupPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CostGroupComponent,
        CostGroupDialogComponent,
        CostGroupDeleteDialogComponent,
        CostGroupPopupComponent,
        CostGroupDeletePopupComponent,
    ],
    entryComponents: [
        CostGroupComponent,
        CostGroupDialogComponent,
        CostGroupPopupComponent,
        CostGroupDeleteDialogComponent,
        CostGroupDeletePopupComponent,
    ],
    providers: [
        CostGroupService,
        CostGroupPopupService,
        CostGroupResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayCostGroupModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }}
