import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterModule} from '@angular/router';

import {NiopdcgatewaySharedModule} from '../../shared';
import {
    UserTokenService,
    UserTokenPopupService,
    UserTokenComponent,
    UserTokenDialogComponent,
    UserTokenPopupComponent,
    UserTokenDeletePopupComponent,
    UserTokenDeleteDialogComponent,
    userTokenRoute,
    userTokenPopupRoute,
    UserTokenResolvePagingParams,
} from './';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core/language.helper';

const ENTITY_STATES = [
    ...userTokenRoute,
    ...userTokenPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        UserTokenComponent,
        UserTokenDialogComponent,
        UserTokenDeleteDialogComponent,
        UserTokenPopupComponent,
        UserTokenDeletePopupComponent,
    ],
    entryComponents: [
        UserTokenComponent,
        UserTokenDialogComponent,
        UserTokenPopupComponent,
        UserTokenDeleteDialogComponent,
        UserTokenDeletePopupComponent,
    ],
    providers: [
        UserTokenService,
        UserTokenPopupService,
        UserTokenResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayUserTokenModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
