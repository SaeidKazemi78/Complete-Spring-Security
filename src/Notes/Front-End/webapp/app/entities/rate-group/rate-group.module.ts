import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    RateGroupService,
    RateGroupPopupService,
    RateGroupComponent,
    RateGroupDialogComponent,
    RateGroupPopupComponent,
    RateGroupDeletePopupComponent,
    RateGroupDeleteDialogComponent,
    RateGroupArchivePopupComponent,
    RateGroupArchiveDialogComponent,
    rateGroupRoute,
    rateGroupPopupRoute,
    RateGroupResolvePagingParams,
} from './';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core/language.helper';

const ENTITY_STATES = [
    ...rateGroupRoute,
    ...rateGroupPopupRoute
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RateGroupComponent,
        RateGroupDialogComponent,
        RateGroupDeleteDialogComponent,
        RateGroupArchivePopupComponent,
        RateGroupPopupComponent,
        RateGroupDeletePopupComponent,
        RateGroupArchiveDialogComponent,
    ],
    entryComponents: [
        RateGroupComponent,
        RateGroupDialogComponent,
        RateGroupPopupComponent,
        RateGroupDeleteDialogComponent,
        RateGroupArchivePopupComponent,
        RateGroupDeletePopupComponent,
        RateGroupArchiveDialogComponent,
    ],
    providers: [
        RateGroupService,
        RateGroupPopupService,
        RateGroupResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayRateGroupModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }}
