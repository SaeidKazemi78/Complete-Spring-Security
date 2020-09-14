import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    PosDeviceService,
    PosDevicePopupService,
    PosDeviceComponent,
    PosDeviceDialogComponent,
    PosDevicePopupComponent,
    PosDeviceDeletePopupComponent,
    PosDeviceDeleteDialogComponent,
    posDeviceRoute,
    posDevicePopupRoute,
    PosDeviceResolvePagingParams,
} from './';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core/language.helper';

const ENTITY_STATES = [
    ...posDeviceRoute,
    ...posDevicePopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PosDeviceComponent,
        PosDeviceDialogComponent,
        PosDeviceDeleteDialogComponent,
        PosDevicePopupComponent,
        PosDeviceDeletePopupComponent,
    ],
    entryComponents: [
        PosDeviceComponent,
        PosDeviceDialogComponent,
        PosDevicePopupComponent,
        PosDeviceDeleteDialogComponent,
        PosDeviceDeletePopupComponent,
    ],
    providers: [
        PosDeviceService,
        PosDevicePopupService,
        PosDeviceResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayPosDeviceModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }}
