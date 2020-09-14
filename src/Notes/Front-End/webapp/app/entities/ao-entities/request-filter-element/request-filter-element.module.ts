import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
import {NiopdcgatewaySharedModule} from '../../../shared/index';
import {
    RequestFilterElementComponent,
    RequestFilterElementConfirmDialogComponent,
    RequestFilterElementConfirmPopupComponent,
    RequestFilterElementDeleteDialogComponent,
    RequestFilterElementDeletePopupComponent,
    RequestFilterElementDialogComponent,
    RequestFilterElementPopupComponent,
    requestFilterElementPopupRoute,
    RequestFilterElementPopupService,
    RequestFilterElementResolvePagingParams,
    requestFilterElementRoute,
    RequestFilterElementSendDialogComponent,
    RequestFilterElementSendPopupComponent,
    RequestFilterElementService,
} from './index';
import {RequestFilterElementReportComponent} from './request-filter-element-report.component';
import {NiopdcgatewayChangeFilterElementModule} from "app/entities/ao-entities/change-filter-element/change-filter-element.module";

const ENTITY_STATES = [
    ...requestFilterElementRoute,
    ...requestFilterElementPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        NiopdcgatewayChangeFilterElementModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RequestFilterElementComponent,
        RequestFilterElementDialogComponent,
        RequestFilterElementDeleteDialogComponent,
        RequestFilterElementSendDialogComponent,
        RequestFilterElementConfirmDialogComponent,
        RequestFilterElementPopupComponent,
        RequestFilterElementDeletePopupComponent,
        RequestFilterElementSendPopupComponent,
        RequestFilterElementConfirmPopupComponent,
        RequestFilterElementReportComponent
    ],
    entryComponents: [
        RequestFilterElementComponent,
        RequestFilterElementDialogComponent,
        RequestFilterElementPopupComponent,
        RequestFilterElementDeleteDialogComponent,
        RequestFilterElementDeletePopupComponent,
        RequestFilterElementSendDialogComponent,
        RequestFilterElementSendPopupComponent,
        RequestFilterElementConfirmDialogComponent,
        RequestFilterElementConfirmPopupComponent,
        RequestFilterElementReportComponent
    ],
    providers: [
        RequestFilterElementService,
        RequestFilterElementPopupService,
        RequestFilterElementResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayRequestFilterElementModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
