import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    UserPosDeviceService,
    UserPosDevicePopupService,
    UserPosDeviceComponent,
    UserPosDeviceDialogComponent,
    UserPosDevicePopupComponent,
    UserPosDeviceDeletePopupComponent,
    UserPosDeviceDeleteDialogComponent,
    userPosDeviceRoute,
    userPosDevicePopupRoute,
    UserPosDeviceResolvePagingParams,
} from './';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core/language.helper';

const ENTITY_STATES = [
    ...userPosDeviceRoute,
    ...userPosDevicePopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        UserPosDeviceComponent,
        UserPosDeviceDialogComponent,
        UserPosDeviceDeleteDialogComponent,
        UserPosDevicePopupComponent,
        UserPosDeviceDeletePopupComponent,
    ],
    entryComponents: [
        UserPosDeviceComponent,
        UserPosDeviceDialogComponent,
        UserPosDevicePopupComponent,
        UserPosDeviceDeleteDialogComponent,
        UserPosDeviceDeletePopupComponent,
    ],
    providers: [
        UserPosDeviceService,
        UserPosDevicePopupService,
        UserPosDeviceResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayUserPosDeviceModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }}
