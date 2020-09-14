import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
import {NiopdcgatewaySharedModule} from '../../../shared';
import {
    TestResultMappingComponent,
    TestResultMappingDeleteDialogComponent,
    TestResultMappingDeletePopupComponent,
    TestResultMappingDialogComponent,
    TestResultMappingPopupComponent,
    testResultMappingPopupRoute,
    TestResultMappingPopupService,
    TestResultMappingResolvePagingParams,
    testResultMappingRoute,
    TestResultMappingService,
} from './index';

const ENTITY_STATES = [
    ...testResultMappingRoute,
    ...testResultMappingPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, {useHash: true})
    ],
    declarations: [
        TestResultMappingComponent,
        TestResultMappingDialogComponent,
        TestResultMappingDeleteDialogComponent,
        TestResultMappingPopupComponent,
        TestResultMappingDeletePopupComponent,
    ],
    entryComponents: [
        TestResultMappingComponent,
        TestResultMappingDialogComponent,
        TestResultMappingPopupComponent,
        TestResultMappingDeleteDialogComponent,
        TestResultMappingDeletePopupComponent,
    ],
    providers: [
        TestResultMappingService,
        TestResultMappingPopupService,
        TestResultMappingResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayTestResultMappingModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
