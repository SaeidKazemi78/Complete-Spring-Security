import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    DepositIdentifierService,
    DepositIdentifierPopupService,
    DepositIdentifierDialogComponent,
    DepositIdentifierPopupComponent,
    depositIdentifierPopupRoute
} from './';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from '../../core/language.helper';
const ENTITY_STATES = [
    ...depositIdentifierPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DepositIdentifierDialogComponent,
        DepositIdentifierDialogComponent,
        DepositIdentifierPopupComponent
    ],
    entryComponents: [
        DepositIdentifierDialogComponent,
        DepositIdentifierPopupComponent,
        DepositIdentifierDialogComponent
    ],
    providers: [
        { provide: JhiLanguageService, useClass: JhiLanguageService },
        DepositIdentifierService,
        DepositIdentifierPopupService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayDepositIdentifierModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
