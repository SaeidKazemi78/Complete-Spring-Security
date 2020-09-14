import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
import {NiopdcgatewaySharedModule} from '../../../shared/index';
import {
    ResponsePlungingComponent,
    ResponsePlungingDeleteDialogComponent,
    ResponsePlungingDeletePopupComponent,
    ResponsePlungingDialogComponent,
    ResponsePlungingPopupComponent,
    responsePlungingPopupRoute,
    ResponsePlungingPopupService,
    ResponsePlungingResolvePagingParams,
    responsePlungingRoute,
    ResponsePlungingService,
} from './index';

const ENTITY_STATES = [
    ...responsePlungingRoute,
    ...responsePlungingPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ResponsePlungingComponent,
        ResponsePlungingDialogComponent,
        ResponsePlungingDeleteDialogComponent,
        ResponsePlungingPopupComponent,
        ResponsePlungingDeletePopupComponent,
    ],
    entryComponents: [
        ResponsePlungingComponent,
        ResponsePlungingDialogComponent,
        ResponsePlungingPopupComponent,
        ResponsePlungingDeleteDialogComponent,
        ResponsePlungingDeletePopupComponent,
    ],
    providers: [
        ResponsePlungingService,
        ResponsePlungingPopupService,
        ResponsePlungingResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayResponsePlungingModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
