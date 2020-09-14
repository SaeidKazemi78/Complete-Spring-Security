import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
import {NiopdcgatewaySharedModule} from '../../../shared/index';
import {
    ChangeRequestElementComponent,
    ChangeRequestElementDeleteDialogComponent,
    ChangeRequestElementDeletePopupComponent,
    ChangeRequestElementDetailComponent,
    ChangeRequestElementDialogComponent,
    ChangeRequestElementPopupComponent,
    changeRequestElementPopupRoute,
    ChangeRequestElementPopupService,
    ChangeRequestElementResolvePagingParams,
    changeRequestElementRoute,
    ChangeRequestElementService,
} from './index';

const ENTITY_STATES = [
    ...changeRequestElementRoute,
    ...changeRequestElementPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ChangeRequestElementComponent,
        ChangeRequestElementDetailComponent,
        ChangeRequestElementDialogComponent,
        ChangeRequestElementDeleteDialogComponent,
        ChangeRequestElementPopupComponent,
        ChangeRequestElementDeletePopupComponent,
    ],
    entryComponents: [
        ChangeRequestElementComponent,
        ChangeRequestElementDialogComponent,
        ChangeRequestElementPopupComponent,
        ChangeRequestElementDeleteDialogComponent,
        ChangeRequestElementDeletePopupComponent,
    ],
    providers: [
        ChangeRequestElementService,
        ChangeRequestElementPopupService,
        ChangeRequestElementResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayChangeRequestElementModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
