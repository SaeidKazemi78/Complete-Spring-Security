import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
import {NiopdcgatewaySharedModule} from '../../../shared/index';
import {
    LogBookComponent,
    LogBookDeleteDialogComponent,
    LogBookDeletePopupComponent,
    LogBookDialogComponent,
    LogBookPopupComponent,
    logBookPopupRoute,
    LogBookPopupService,
    LogBookResolvePagingParams,
    logBookRoute,
    LogBookService,
} from './index';

const ENTITY_STATES = [
    ...logBookRoute,
    ...logBookPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        LogBookComponent,
        LogBookDialogComponent,
        LogBookDeleteDialogComponent,
        LogBookPopupComponent,
        LogBookDeletePopupComponent,
    ],
    entryComponents: [
        LogBookComponent,
        LogBookDialogComponent,
        LogBookPopupComponent,
        LogBookDeleteDialogComponent,
        LogBookDeletePopupComponent,
    ],
    providers: [
        LogBookService,
        LogBookPopupService,
        LogBookResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayLogBookModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
