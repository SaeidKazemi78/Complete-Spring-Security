import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    ShiftWorkService,
    ShiftWorkPopupService,
    ShiftWorkOpenCloseDialogComponent,
    ShiftWorkOpenClosePopupDialogComponent,
    shiftWorkOpenClosePopupRoute,
    ShiftWorkResolvePagingParams,
} from './';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core/language.helper';

const ENTITY_STATES = [
    ...shiftWorkOpenClosePopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ShiftWorkOpenCloseDialogComponent,
        ShiftWorkOpenClosePopupDialogComponent
    ],
    entryComponents: [
        ShiftWorkOpenCloseDialogComponent,
        ShiftWorkOpenClosePopupDialogComponent
    ],
    providers: [
        ShiftWorkService,
        ShiftWorkPopupService,
        ShiftWorkResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayOpenCloseShiftWorkPopupModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
