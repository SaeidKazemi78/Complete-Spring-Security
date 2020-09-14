import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    RoleLevelService,
    RoleLevelPopupService,
    RoleLevelComponent,
    RoleLevelDialogComponent,
    RoleLevelPopupComponent,
    RoleLevelDeletePopupComponent,
    RoleLevelDeleteDialogComponent,
    roleLevelRoute,
    roleLevelPopupRoute,
    RoleLevelResolvePagingParams,
} from './';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core/language.helper';

const ENTITY_STATES = [
    ...roleLevelRoute,
    ...roleLevelPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RoleLevelComponent,
        RoleLevelDialogComponent,
        RoleLevelDeleteDialogComponent,
        RoleLevelPopupComponent,
        RoleLevelDeletePopupComponent,
    ],
    entryComponents: [
        RoleLevelComponent,
        RoleLevelDialogComponent,
        RoleLevelPopupComponent,
        RoleLevelDeleteDialogComponent,
        RoleLevelDeletePopupComponent,
    ],
    providers: [
        RoleLevelService,
        RoleLevelPopupService,
        RoleLevelResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayRoleLevelModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }}
