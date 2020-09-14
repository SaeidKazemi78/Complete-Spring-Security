import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
import {NiopdcgatewaySharedModule} from '../../../shared/index';
import {
    MilliPoorComponent,
    MilliPoorDeleteDialogComponent,
    MilliPoorDeletePopupComponent,
    MilliPoorDialogComponent,
    MilliPoorPopupComponent,
    milliPoorPopupRoute,
    MilliPoorPopupService,
    MilliPoorResolvePagingParams,
    milliPoorRoute,
    MilliPoorService,
} from './index';

const ENTITY_STATES = [
    ...milliPoorRoute,
    ...milliPoorPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MilliPoorComponent,
        MilliPoorDialogComponent,
        MilliPoorDeleteDialogComponent,
        MilliPoorPopupComponent,
        MilliPoorDeletePopupComponent,
    ],
    entryComponents: [
        MilliPoorComponent,
        MilliPoorDialogComponent,
        MilliPoorPopupComponent,
        MilliPoorDeleteDialogComponent,
        MilliPoorDeletePopupComponent,
    ],
    providers: [
        MilliPoorService,
        MilliPoorPopupService,
        MilliPoorResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayMilliPoorModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
