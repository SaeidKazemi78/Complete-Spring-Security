import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
import {NiopdcgatewaySharedModule} from '../../../shared';
import {
    RequestElementComponent,
    RequestElementDeleteDialogComponent,
    RequestElementDeletePopupComponent,
    RequestElementDialogComponent,
    RequestElementPopupComponent,
    requestElementPopupRoute,
    RequestElementPopupService,
    RequestElementResolvePagingParams,
    requestElementRoute,
    RequestElementService,
} from './index';

const ENTITY_STATES = [
    ...requestElementRoute,
    ...requestElementPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, {useHash: true})
    ],
    declarations: [
        RequestElementComponent,
        RequestElementDialogComponent,
        RequestElementDeleteDialogComponent,
        RequestElementPopupComponent,
        RequestElementDeletePopupComponent,
    ],
    entryComponents: [
        RequestElementComponent,
        RequestElementDialogComponent,
        RequestElementPopupComponent,
        RequestElementDeleteDialogComponent,
        RequestElementDeletePopupComponent,
    ],
    providers: [
        RequestElementService,
        RequestElementPopupService,
        RequestElementResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayRequestElementModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
