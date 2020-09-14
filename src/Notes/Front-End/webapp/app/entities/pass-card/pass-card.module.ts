import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    PassCardService,
    PassCardPopupService,
    PassCardComponent,
    PassCardDialogComponent,
    PassCardPopupComponent,
    PassCardDeletePopupComponent,
    PassCardDeleteDialogComponent,
    passCardRoute,
    passCardPopupRoute,
    PassCardResolvePagingParams,
} from './';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core/language.helper';

const ENTITY_STATES = [
    ...passCardRoute,
    ...passCardPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PassCardComponent,
        PassCardDialogComponent,
        PassCardDeleteDialogComponent,
        PassCardPopupComponent,
        PassCardDeletePopupComponent,
    ],
    entryComponents: [
        PassCardComponent,
        PassCardDialogComponent,
        PassCardPopupComponent,
        PassCardDeleteDialogComponent,
        PassCardDeletePopupComponent,
    ],
    providers: [
        PassCardService,
        PassCardPopupService,
        PassCardResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayPassCardModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
