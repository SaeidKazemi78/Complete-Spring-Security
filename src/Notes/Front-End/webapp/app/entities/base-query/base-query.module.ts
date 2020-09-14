import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    BaseQueryService,
    BaseQueryPopupService,
    BaseQueryComponent,
    BaseQueryDialogComponent,
    BaseQueryPopupComponent,
    BaseQueryDeletePopupComponent,
    BaseQueryDeleteDialogComponent,
    baseQueryRoute,
    baseQueryPopupRoute,
    BaseQueryResolvePagingParams,
} from './';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core/language.helper';

const ENTITY_STATES = [
    ...baseQueryRoute,
    ...baseQueryPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BaseQueryComponent,
        BaseQueryDialogComponent,
        BaseQueryDeleteDialogComponent,
        BaseQueryPopupComponent,
        BaseQueryDeletePopupComponent,
    ],
    entryComponents: [
        BaseQueryComponent,
        BaseQueryDialogComponent,
        BaseQueryPopupComponent,
        BaseQueryDeleteDialogComponent,
        BaseQueryDeletePopupComponent,
    ],
    providers: [
        { provide: JhiLanguageService, useClass: JhiLanguageService },
        BaseQueryService,
        BaseQueryPopupService,
        BaseQueryResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayBaseQueryModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
