import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
import {NiopdcgatewaySharedModule} from '../../../shared/index';
import {
    RequestTestResultComponent,
    RequestTestResultConfirmDialogComponent,
    RequestTestResultConfirmPopupComponent,
    RequestTestResultDeleteDialogComponent,
    RequestTestResultDeletePopupComponent,
    RequestTestResultDialogComponent,
    RequestTestResultPopupComponent,
    requestTestResultPopupRoute,
    RequestTestResultPopupService,
    RequestTestResultResolvePagingParams,
    requestTestResultRoute,
    RequestTestResultSendDialogComponent,
    RequestTestResultSendPopupComponent,
    RequestTestResultService,
} from './index';
import {NiopdcgatewayTestResultModule} from 'app/entities/ao-entities/test-result/test-result.module';

const ENTITY_STATES = [
    ...requestTestResultRoute,
    ...requestTestResultPopupRoute,

];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        NiopdcgatewayTestResultModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RequestTestResultComponent,
        RequestTestResultDialogComponent,
        RequestTestResultDeleteDialogComponent,
        RequestTestResultConfirmDialogComponent,
        RequestTestResultSendDialogComponent,
        RequestTestResultPopupComponent,
        RequestTestResultDeletePopupComponent,
        RequestTestResultConfirmPopupComponent,
        RequestTestResultSendPopupComponent,
    ],
    entryComponents: [
        RequestTestResultComponent,
        RequestTestResultDialogComponent,
        RequestTestResultPopupComponent,
        RequestTestResultDeleteDialogComponent,
        RequestTestResultDeletePopupComponent,
        RequestTestResultConfirmDialogComponent,
        RequestTestResultConfirmPopupComponent,
        RequestTestResultSendDialogComponent,
        RequestTestResultSendPopupComponent,
    ],
    providers: [
        RequestTestResultService,
        RequestTestResultPopupService,
        RequestTestResultResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayRequestTestResultModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
