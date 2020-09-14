import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
import {NiopdcgatewaySharedModule} from '../../../shared/index';
import {
    BaseTestResultComponent,
    BaseTestResultDeleteDialogComponent,
    BaseTestResultDeletePopupComponent,
    BaseTestResultDialogComponent,
    BaseTestResultPopupComponent,
    baseTestResultPopupRoute,
    BaseTestResultPopupService,
    BaseTestResultResolvePagingParams,
    baseTestResultRoute,
    BaseTestResultService,
} from './index';

const ENTITY_STATES = [
    ...baseTestResultRoute,
    ...baseTestResultPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BaseTestResultComponent,
        BaseTestResultDialogComponent,
        BaseTestResultDeleteDialogComponent,
        BaseTestResultPopupComponent,
        BaseTestResultDeletePopupComponent,
    ],
    entryComponents: [
        BaseTestResultComponent,
        BaseTestResultDialogComponent,
        BaseTestResultPopupComponent,
        BaseTestResultDeleteDialogComponent,
        BaseTestResultDeletePopupComponent,
    ],
    providers: [
        BaseTestResultService,
        BaseTestResultPopupService,
        BaseTestResultResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayBaseTestResultModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
