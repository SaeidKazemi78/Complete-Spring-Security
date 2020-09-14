import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import {JhiLanguageService} from 'ng-jhipster';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    UserManagementService,
    UserManagementPopupService,
    UserManagementDialogComponent,
    UserManagementPopupComponent,
    userManagementPopupRoute,
    UserManagementResolvePagingParams, UserManagementDeleteDialogComponent, UserManagementDeletePopupComponent,
} from './';
import {JhiLanguageHelper} from 'app/core/language.helper';

const ENTITY_STATES = [
    ...userManagementPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        UserManagementDialogComponent,
        UserManagementPopupComponent,
        UserManagementDeleteDialogComponent,
        UserManagementDeletePopupComponent,
    ],
    entryComponents: [
        UserManagementDialogComponent,
        UserManagementPopupComponent,
        UserManagementDeleteDialogComponent,
        UserManagementDeletePopupComponent,
    ],
    providers: [
        UserManagementService,
        UserManagementPopupService,
        UserManagementResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayUserManagementDialogModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
