import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
import {NiopdcgatewaySharedModule} from '../../../shared/index';
import {
    SellGroundFuelComponent,
    SellGroundFuelDeleteDialogComponent,
    SellGroundFuelDeletePopupComponent,
    SellGroundFuelDialogComponent,
    SellGroundFuelPopupComponent,
    sellGroundFuelPopupRoute,
    SellGroundFuelPopupService,
    SellGroundFuelResolvePagingParams,
    sellGroundFuelRoute,
    SellGroundFuelService,
} from './index';

const ENTITY_STATES = [
    ...sellGroundFuelRoute,
    ...sellGroundFuelPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SellGroundFuelComponent,
        SellGroundFuelDialogComponent,
        SellGroundFuelDeleteDialogComponent,
        SellGroundFuelPopupComponent,
        SellGroundFuelDeletePopupComponent,
    ],
    entryComponents: [
        SellGroundFuelComponent,
        SellGroundFuelDialogComponent,
        SellGroundFuelPopupComponent,
        SellGroundFuelDeleteDialogComponent,
        SellGroundFuelDeletePopupComponent,
    ],
    providers: [
        SellGroundFuelService,
        SellGroundFuelPopupService,
        SellGroundFuelResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewaySellGroundFuelModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
