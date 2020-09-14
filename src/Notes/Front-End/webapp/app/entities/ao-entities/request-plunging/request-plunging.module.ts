import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
import {NiopdcgatewaySharedModule} from '../../../shared/index';
import {
    RequestPlungingComponent,
    RequestPlungingDeleteDialogComponent,
    RequestPlungingDeletePopupComponent,
    RequestPlungingDialogComponent,
    RequestPlungingPopupComponent,
    requestPlungingPopupRoute,
    RequestPlungingPopupService,
    RequestPlungingResolvePagingParams,
    requestPlungingRoute,
    RequestPlungingService,
} from './index';

const ENTITY_STATES = [
    ...requestPlungingRoute,
    ...requestPlungingPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RequestPlungingComponent,
        RequestPlungingDialogComponent,
        RequestPlungingDeleteDialogComponent,
        RequestPlungingPopupComponent,
        RequestPlungingDeletePopupComponent,
    ],
    entryComponents: [
        RequestPlungingComponent,
        RequestPlungingDialogComponent,
        RequestPlungingPopupComponent,
        RequestPlungingDeleteDialogComponent,
        RequestPlungingDeletePopupComponent,
    ],
    providers: [
        RequestPlungingService,
        RequestPlungingPopupService,
        RequestPlungingResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayRequestPlungingModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
