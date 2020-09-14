import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
import {NiopdcgatewaySharedModule} from '../../../shared';
import {
    ElementComponent,
    ElementDeleteDialogComponent,
    ElementDeletePopupComponent,
    ElementDialogComponent,
    ElementPopupComponent,
    elementPopupRoute,
    ElementPopupService,
    ElementResolvePagingParams,
    elementRoute,
    ElementService,
} from './index';

const ENTITY_STATES = [
    ...elementRoute,
    ...elementPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ElementComponent,
        ElementDialogComponent,
        ElementDeleteDialogComponent,
        ElementPopupComponent,
        ElementDeletePopupComponent,
    ],
    entryComponents: [
        ElementComponent,
        ElementDialogComponent,
        ElementPopupComponent,
        ElementDeleteDialogComponent,
        ElementDeletePopupComponent,
    ],
    providers: [
        ElementService,
        ElementPopupService,
        ElementResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayElementModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
