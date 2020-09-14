import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    ShiftWorkService,
    ShiftWorkPopupService,
    ShiftWorkDialogComponent,
    ShiftWorkPopupComponent,
    ShiftWorkDeletePopupComponent,
    ShiftWorkDeleteDialogComponent,
    ShiftWorkComponent,
    shiftWorkRoute,
    shiftWorkPopupRoute,
    ShiftWorkResolvePagingParams,
} from './';

import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {NiopdcgatewayOpenCloseShiftWorkPopupModule} from 'app/entities/shift-work/shift-work-open-close-popup.module';

const ENTITY_STATES = [
    ...shiftWorkRoute,
    ...shiftWorkPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        NiopdcgatewayOpenCloseShiftWorkPopupModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ShiftWorkComponent,
        ShiftWorkDialogComponent,
        ShiftWorkDeleteDialogComponent,
        ShiftWorkPopupComponent,
        ShiftWorkDeletePopupComponent,
    ],
    entryComponents: [
        ShiftWorkComponent,
        ShiftWorkDialogComponent,
        ShiftWorkPopupComponent,
        ShiftWorkDeleteDialogComponent,
        ShiftWorkDeletePopupComponent,
    ],
    providers: [
        ShiftWorkService,
        ShiftWorkPopupService,
        ShiftWorkResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayShiftWorkModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
