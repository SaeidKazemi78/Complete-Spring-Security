import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
import {NiopdcgatewaySharedModule} from '../../../shared/index';
import {
    OilTankComponent,
    OilTankDeleteDialogComponent,
    OilTankDeletePopupComponent,
    OilTankDialogComponent,
    OilTankPopupComponent,
    oilTankPopupRoute,
    OilTankPopupService,
    OilTankResolvePagingParams,
    oilTankRoute,
    OilTankService,
} from './index';

const ENTITY_STATES = [
    ...oilTankRoute,
    ...oilTankPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        OilTankComponent,
        OilTankDialogComponent,
        OilTankDeleteDialogComponent,
        OilTankPopupComponent,
        OilTankDeletePopupComponent,
    ],
    entryComponents: [
        OilTankComponent,
        OilTankDialogComponent,
        OilTankPopupComponent,
        OilTankDeleteDialogComponent,
        OilTankDeletePopupComponent,
    ],
    providers: [
        OilTankService,
        OilTankPopupService,
        OilTankResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayOilTankModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
