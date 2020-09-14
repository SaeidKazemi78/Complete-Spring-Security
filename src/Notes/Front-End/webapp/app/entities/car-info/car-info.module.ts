import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterModule} from '@angular/router';

import {NiopdcgatewaySharedModule} from '../../shared';
import {
    CarInfoService,
    CarInfoPopupService,
    CarInfoComponent,
    CarInfoDialogComponent,
    CarInfoPopupComponent,
    CarInfoDeletePopupComponent,
    CarInfoDeleteDialogComponent,
    carInfoRoute,
    carInfoPopupRoute,
    CarInfoResolvePagingParams,
} from './';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core/language.helper';

const ENTITY_STATES = [
    ...carInfoRoute,
    ...carInfoPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CarInfoComponent,
        CarInfoDialogComponent,
        CarInfoDeleteDialogComponent,
        CarInfoPopupComponent,
        CarInfoDeletePopupComponent,
    ],
    entryComponents: [
        CarInfoComponent,
        CarInfoDialogComponent,
        CarInfoPopupComponent,
        CarInfoDeleteDialogComponent,
        CarInfoDeletePopupComponent,
    ],
    providers: [
        CarInfoService,
        CarInfoPopupService,
        CarInfoResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayCarInfoModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
