import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
import {NiopdcgatewaySharedModule} from '../../../shared';
import {
    LastChangeDateElementComponent,
    LastChangeDateElementDeleteDialogComponent,
    LastChangeDateElementDeletePopupComponent,
    LastChangeDateElementDetailComponent,
    LastChangeDateElementDialogComponent,
    LastChangeDateElementPopupComponent,
    lastChangeDateElementPopupRoute,
    LastChangeDateElementPopupService,
    LastChangeDateElementResolvePagingParams,
    lastChangeDateElementRoute,
    LastChangeDateElementService,
} from './index';

const ENTITY_STATES = [
    ...lastChangeDateElementRoute,
    ...lastChangeDateElementPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        LastChangeDateElementComponent,
        LastChangeDateElementDetailComponent,
        LastChangeDateElementDialogComponent,
        LastChangeDateElementDeleteDialogComponent,
        LastChangeDateElementPopupComponent,
        LastChangeDateElementDeletePopupComponent,
    ],
    entryComponents: [
        LastChangeDateElementComponent,
        LastChangeDateElementDialogComponent,
        LastChangeDateElementPopupComponent,
        LastChangeDateElementDeleteDialogComponent,
        LastChangeDateElementDeletePopupComponent,
    ],
    providers: [
        LastChangeDateElementService,
        LastChangeDateElementPopupService,
        LastChangeDateElementResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayLastChangeDateElementModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
