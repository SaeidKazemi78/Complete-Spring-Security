import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
import {NiopdcgatewaySharedModule} from '../../../shared/index';
import {
    TestResultComponent,
    TestResultDeleteDialogComponent,
    TestResultDeletePopupComponent,
    TestResultDialogComponent,
    TestResultPopupComponent,
    testResultPopupRoute,
    TestResultPopupService,
    TestResultResolvePagingParams,
    testResultRoute,
    TestResultService,
} from './index';

const ENTITY_STATES = [
    ...testResultRoute,
    ...testResultPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TestResultComponent,
        TestResultDialogComponent,
        TestResultDeleteDialogComponent,
        TestResultPopupComponent,
        TestResultDeletePopupComponent,
    ],
    entryComponents: [
        TestResultComponent,
        TestResultDialogComponent,
        TestResultPopupComponent,
        TestResultDeleteDialogComponent,
        TestResultDeletePopupComponent,
    ],
    providers: [
        TestResultService,
        TestResultPopupService,
        TestResultResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayTestResultModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
