import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    PspConfigService,
    PspConfigPopupService,
    PspConfigComponent,
    PspConfigDialogComponent,
    PspConfigPopupComponent,
    PspConfigDeletePopupComponent,
    PspConfigDeleteDialogComponent,
    pspConfigRoute,
    pspConfigPopupRoute,
    PspConfigResolvePagingParams,
} from './';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core/language.helper';

const ENTITY_STATES = [
    ...pspConfigRoute,
    ...pspConfigPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PspConfigComponent,
        PspConfigDialogComponent,
        PspConfigDeleteDialogComponent,
        PspConfigPopupComponent,
        PspConfigDeletePopupComponent,
    ],
    entryComponents: [
        PspConfigComponent,
        PspConfigDialogComponent,
        PspConfigPopupComponent,
        PspConfigDeleteDialogComponent,
        PspConfigDeletePopupComponent,
    ],
    providers: [
        PspConfigService,
        PspConfigPopupService,
        PspConfigResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayPspConfigModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }}
