import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
import {NiopdcgatewaySharedModule} from '../../../shared/index';
import {
    OilTankContainerComponent,
    OilTankContainerDeleteDialogComponent,
    OilTankContainerDeletePopupComponent,
    OilTankContainerDialogComponent,
    OilTankContainerPopupComponent,
    oilTankContainerPopupRoute,
    OilTankContainerPopupService,
    OilTankContainerResolvePagingParams,
    oilTankContainerRoute,
    OilTankContainerService,
} from './index';

const ENTITY_STATES = [
    ...oilTankContainerRoute,
    ...oilTankContainerPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        OilTankContainerComponent,
        OilTankContainerDialogComponent,
        OilTankContainerDeleteDialogComponent,
        OilTankContainerPopupComponent,
        OilTankContainerDeletePopupComponent,
    ],
    entryComponents: [
        OilTankContainerComponent,
        OilTankContainerDialogComponent,
        OilTankContainerPopupComponent,
        OilTankContainerDeleteDialogComponent,
        OilTankContainerDeletePopupComponent,
    ],
    providers: [
        OilTankContainerService,
        OilTankContainerPopupService,
        OilTankContainerResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayOilTankContainerModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
