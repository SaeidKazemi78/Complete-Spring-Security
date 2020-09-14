import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
import {NiopdcgatewaySharedModule} from '../../../shared';
import {
    MainDayDepotCloseDialogComponent,
    MainDayDepotClosePopupComponent,
    MainDayDepotComponent,
    MainDayDepotContaminateDialogComponent,
    MainDayDepotContaminatePopupComponent,
    MainDayDepotDeleteDialogComponent,
    MainDayDepotDeletePopupComponent,
    MainDayDepotDialogComponent,
    MainDayDepotPopupComponent,
    mainDayDepotPopupRoute,
    MainDayDepotPopupService,
    MainDayDepotResolvePagingParams,
    mainDayDepotRoute,
    MainDayDepotService,
    MainDayDepotUpdateDialogComponent,
    MainDayDepotUpdatePopupComponent,
} from './';
import {MainDayDepotOpenDialogComponent, MainDayDepotOpenPopupComponent} from './main-day-depot-open-dialog.component';

const ENTITY_STATES = [
    ...mainDayDepotRoute,
    ...mainDayDepotPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MainDayDepotComponent,
        MainDayDepotDialogComponent,
        MainDayDepotDeleteDialogComponent,
        MainDayDepotPopupComponent,
        MainDayDepotDeletePopupComponent,
        MainDayDepotClosePopupComponent,
        MainDayDepotCloseDialogComponent,
        MainDayDepotContaminatePopupComponent,
        MainDayDepotContaminateDialogComponent,
        MainDayDepotUpdatePopupComponent,
        MainDayDepotUpdateDialogComponent,
        MainDayDepotOpenDialogComponent,
        MainDayDepotOpenPopupComponent
    ],
    entryComponents: [
        MainDayDepotComponent,
        MainDayDepotDialogComponent,
        MainDayDepotPopupComponent,
        MainDayDepotDeleteDialogComponent,
        MainDayDepotDeletePopupComponent,
        MainDayDepotClosePopupComponent,
        MainDayDepotCloseDialogComponent,
        MainDayDepotContaminatePopupComponent,
        MainDayDepotContaminateDialogComponent,
        MainDayDepotUpdatePopupComponent,
        MainDayDepotUpdateDialogComponent,
        MainDayDepotOpenDialogComponent,
        MainDayDepotOpenPopupComponent
    ],
    providers: [
        MainDayDepotService,
        MainDayDepotPopupService,
        MainDayDepotResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayMainDayDepotModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
