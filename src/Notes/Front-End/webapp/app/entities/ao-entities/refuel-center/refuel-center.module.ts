import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
import {NiopdcgatewaySharedModule} from '../../../shared/index';
import {
    RefuelCenterComponent,
    RefuelCenterDeleteDialogComponent,
    RefuelCenterDeletePopupComponent,
    RefuelCenterDialogComponent,
    RefuelCenterPopupComponent,
    refuelCenterPopupRoute,
    RefuelCenterPopupService,
    RefuelCenterResolvePagingParams,
    refuelCenterRoute,
    RefuelCenterService,
} from './index';

const ENTITY_STATES = [
    ...refuelCenterRoute,
    ...refuelCenterPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RefuelCenterComponent,
        RefuelCenterDialogComponent,
        RefuelCenterDeleteDialogComponent,
        RefuelCenterPopupComponent,
        RefuelCenterDeletePopupComponent,
    ],
    entryComponents: [
        RefuelCenterComponent,
        RefuelCenterDialogComponent,
        RefuelCenterPopupComponent,
        RefuelCenterDeleteDialogComponent,
        RefuelCenterDeletePopupComponent,
    ],
    providers: [
        { provide: JhiLanguageService, useClass: JhiLanguageService },
        RefuelCenterService,
        RefuelCenterPopupService,
        RefuelCenterResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayRefuelCenterModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
