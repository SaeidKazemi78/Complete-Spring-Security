import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {NiopdcgatewaySharedModule} from '../../shared';
import {
    PlaqueRuleService,
    PlaqueRulePopupService,
    PlaqueRuleComponent,
    PlaqueRuleDialogComponent,
    PlaqueRulePopupComponent,
    PlaqueRuleDeletePopupComponent,
    PlaqueRuleDeleteDialogComponent,
    plaqueRuleRoute,
    plaqueRulePopupRoute,
    PlaqueRuleResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...plaqueRuleRoute,
    ...plaqueRulePopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PlaqueRuleComponent,
        PlaqueRuleDialogComponent,
        PlaqueRuleDeleteDialogComponent,
        PlaqueRulePopupComponent,
        PlaqueRuleDeletePopupComponent,
    ],
    entryComponents: [
        PlaqueRuleComponent,
        PlaqueRuleDialogComponent,
        PlaqueRulePopupComponent,
        PlaqueRuleDeleteDialogComponent,
        PlaqueRuleDeletePopupComponent,
    ],
    providers: [
        PlaqueRuleService,
        PlaqueRulePopupService,
        PlaqueRuleResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayPlaqueRuleModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
