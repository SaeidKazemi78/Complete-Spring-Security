import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
import {NiopdcgatewaySharedModule} from '../../../shared';
import {
    ChangeFilterElementComponent,
    ChangeFilterElementDeleteDialogComponent,
    ChangeFilterElementDeletePopupComponent,
    ChangeFilterElementDialogComponent,
    ChangeFilterElementPopupComponent,
    changeFilterElementPopupRoute,
    ChangeFilterElementPopupService,
    ChangeFilterElementResolvePagingParams,
    changeFilterElementRoute,
    ChangeFilterElementService,
} from './';
import {
    ChangeFilterElementConfirmDialogComponent,
    ChangeFilterElementConfirmPopupComponent
} from './change-filter-element-confirm-dialog.component';

const ENTITY_STATES = [
    ...changeFilterElementRoute,
    ...changeFilterElementPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ChangeFilterElementComponent,
        ChangeFilterElementDialogComponent,
        ChangeFilterElementDeleteDialogComponent,
        ChangeFilterElementPopupComponent,
        ChangeFilterElementDeletePopupComponent,
        ChangeFilterElementConfirmDialogComponent,
        ChangeFilterElementConfirmPopupComponent
    ],
    entryComponents: [
        ChangeFilterElementComponent,
        ChangeFilterElementDialogComponent,
        ChangeFilterElementPopupComponent,
        ChangeFilterElementDeleteDialogComponent,
        ChangeFilterElementDeletePopupComponent,
        ChangeFilterElementConfirmDialogComponent,
        ChangeFilterElementConfirmPopupComponent
    ],
    providers: [
        ChangeFilterElementService,
        ChangeFilterElementPopupService,
        ChangeFilterElementResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayChangeFilterElementModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
