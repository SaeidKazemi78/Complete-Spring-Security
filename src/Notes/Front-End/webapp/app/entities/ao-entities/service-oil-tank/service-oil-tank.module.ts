import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
import {NiopdcgatewaySharedModule} from '../../../shared/index';
import {
    ServiceOilTankComponent,
    ServiceOilTankDeleteDialogComponent,
    ServiceOilTankDeletePopupComponent,
    ServiceOilTankDialogComponent,
    ServiceOilTankPopupComponent,
    serviceOilTankPopupRoute,
    ServiceOilTankPopupService,
    ServiceOilTankResolvePagingParams,
    serviceOilTankRoute,
    ServiceOilTankService,
} from './index';

const ENTITY_STATES = [
    ...serviceOilTankRoute,
    ...serviceOilTankPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ServiceOilTankComponent,
        ServiceOilTankDialogComponent,
        ServiceOilTankDeleteDialogComponent,
        ServiceOilTankPopupComponent,
        ServiceOilTankDeletePopupComponent,
    ],
    entryComponents: [
        ServiceOilTankComponent,
        ServiceOilTankDialogComponent,
        ServiceOilTankPopupComponent,
        ServiceOilTankDeleteDialogComponent,
        ServiceOilTankDeletePopupComponent,
    ],
    providers: [
        ServiceOilTankService,
        ServiceOilTankPopupService,
        ServiceOilTankResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayServiceOilTankModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
