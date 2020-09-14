import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
import {NiopdcgatewaySharedModule} from '../../../shared/index';
import {
    ParentBaseTestResultComponent,
    ParentBaseTestResultDeleteDialogComponent,
    ParentBaseTestResultDeletePopupComponent,
    ParentBaseTestResultDialogComponent,
    ParentBaseTestResultPopupComponent,
    parentBaseTestResultPopupRoute,
    ParentBaseTestResultPopupService,
    ParentBaseTestResultResolvePagingParams,
    parentBaseTestResultRoute,
    ParentBaseTestResultService,
} from './index';

const ENTITY_STATES = [
    ...parentBaseTestResultRoute,
    ...parentBaseTestResultPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ParentBaseTestResultComponent,
        ParentBaseTestResultDialogComponent,
        ParentBaseTestResultDeleteDialogComponent,
        ParentBaseTestResultPopupComponent,
        ParentBaseTestResultDeletePopupComponent,
    ],
    entryComponents: [
        ParentBaseTestResultComponent,
        ParentBaseTestResultDialogComponent,
        ParentBaseTestResultPopupComponent,
        ParentBaseTestResultDeleteDialogComponent,
        ParentBaseTestResultDeletePopupComponent,
    ],
    providers: [
        ParentBaseTestResultService,
        ParentBaseTestResultPopupService,
        ParentBaseTestResultResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayParentBaseTestResultModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
