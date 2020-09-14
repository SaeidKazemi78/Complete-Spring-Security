import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
import {NiopdcgatewaySharedModule} from '../../../shared/index';
import {
    LiteratureVolumeOilTankComponent,
    LiteratureVolumeOilTankDeleteDialogComponent,
    LiteratureVolumeOilTankDeletePopupComponent,
    LiteratureVolumeOilTankDialogComponent,
    LiteratureVolumeOilTankPopupComponent,
    literatureVolumeOilTankPopupRoute,
    LiteratureVolumeOilTankPopupService,
    LiteratureVolumeOilTankResolvePagingParams,
    literatureVolumeOilTankRoute,
    LiteratureVolumeOilTankService,
} from './index';

const ENTITY_STATES = [
    ...literatureVolumeOilTankRoute,
    ...literatureVolumeOilTankPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        LiteratureVolumeOilTankComponent,
        LiteratureVolumeOilTankDialogComponent,
        LiteratureVolumeOilTankDeleteDialogComponent,
        LiteratureVolumeOilTankPopupComponent,
        LiteratureVolumeOilTankDeletePopupComponent,
    ],
    entryComponents: [
        LiteratureVolumeOilTankComponent,
        LiteratureVolumeOilTankDialogComponent,
        LiteratureVolumeOilTankPopupComponent,
        LiteratureVolumeOilTankDeleteDialogComponent,
        LiteratureVolumeOilTankDeletePopupComponent,
    ],
    providers: [
        LiteratureVolumeOilTankService,
        LiteratureVolumeOilTankPopupService,
        LiteratureVolumeOilTankResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayLiteratureVolumeOilTankModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
