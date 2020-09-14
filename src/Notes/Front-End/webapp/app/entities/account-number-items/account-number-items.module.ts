import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    AccountNumberItemsService,
    AccountNumberItemsPopupService,
    AccountNumberItemsComponent,
    AccountNumberItemsDialogComponent,
    AccountNumberItemsPopupComponent,
    AccountNumberItemsDeletePopupComponent,
    AccountNumberItemsDeleteDialogComponent,
    accountNumberItemsRoute,
    accountNumberItemsPopupRoute,
    AccountNumberItemsResolvePagingParams,
} from './';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core/language.helper';
const ENTITY_STATES = [
    ...accountNumberItemsRoute,
    ...accountNumberItemsPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AccountNumberItemsComponent,
        AccountNumberItemsDialogComponent,
        AccountNumberItemsDeleteDialogComponent,
        AccountNumberItemsPopupComponent,
        AccountNumberItemsDeletePopupComponent,
    ],
    entryComponents: [
        AccountNumberItemsComponent,
        AccountNumberItemsDialogComponent,
        AccountNumberItemsPopupComponent,
        AccountNumberItemsDeleteDialogComponent,
        AccountNumberItemsDeletePopupComponent,
    ],
    providers: [
        { provide: JhiLanguageService, useClass: JhiLanguageService },
        AccountNumberItemsService,
        AccountNumberItemsPopupService,
        AccountNumberItemsResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayAccountNumberItemsModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
