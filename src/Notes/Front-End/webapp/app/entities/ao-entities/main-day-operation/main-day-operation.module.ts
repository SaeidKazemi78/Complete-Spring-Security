import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
import {NiopdcgatewaySharedModule} from '../../../shared/index';
import {
    MainDayOperationCloseDialogComponent,
    MainDayOperationClosePopupComponent,
    MainDayOperationComponent,
    MainDayOperationDeleteDialogComponent,
    MainDayOperationDeletePopupComponent,
    MainDayOperationDialogComponent,
    MainDayOperationPopupComponent,
    mainDayOperationPopupRoute,
    MainDayOperationPopupService,
    MainDayOperationResolvePagingParams,
    mainDayOperationRoute,
    MainDayOperationService,
    MainDayOperationUpdateDialogComponent,
    MainDayOperationUpdatePopupComponent
} from './index';
import {
    MainDayOperationOpenDialogComponent,
    MainDayOperationOpenPopupComponent
} from './main-day-operation-open-dialog.component';

const ENTITY_STATES = [
    ...mainDayOperationRoute,
    ...mainDayOperationPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MainDayOperationComponent,
        MainDayOperationDialogComponent,
        MainDayOperationDeleteDialogComponent,
        MainDayOperationPopupComponent,
        MainDayOperationDeletePopupComponent,
        MainDayOperationClosePopupComponent,
        MainDayOperationCloseDialogComponent,
        MainDayOperationUpdatePopupComponent,
        MainDayOperationUpdateDialogComponent,
        MainDayOperationOpenDialogComponent,
        MainDayOperationOpenPopupComponent
    ],
    entryComponents: [
        MainDayOperationComponent,
        MainDayOperationDialogComponent,
        MainDayOperationPopupComponent,
        MainDayOperationDeleteDialogComponent,
        MainDayOperationDeletePopupComponent,
        MainDayOperationClosePopupComponent,
        MainDayOperationCloseDialogComponent,
        MainDayOperationUpdatePopupComponent,
        MainDayOperationUpdateDialogComponent,
        MainDayOperationOpenDialogComponent,
        MainDayOperationOpenPopupComponent
    ],
    providers: [
        MainDayOperationService,
        MainDayOperationPopupService,
        MainDayOperationResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayMainDayOperationModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
