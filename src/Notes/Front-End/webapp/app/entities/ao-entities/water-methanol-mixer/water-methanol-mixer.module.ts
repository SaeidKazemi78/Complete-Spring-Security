import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
import {NiopdcgatewaySharedModule} from '../../../shared/index';
import {
    WaterMethanolMixerComponent,
    WaterMethanolMixerDeleteDialogComponent,
    WaterMethanolMixerDeletePopupComponent,
    WaterMethanolMixerDialogComponent,
    WaterMethanolMixerPopupComponent,
    waterMethanolMixerPopupRoute,
    WaterMethanolMixerPopupService,
    WaterMethanolMixerResolvePagingParams,
    waterMethanolMixerRoute,
    WaterMethanolMixerService,
} from './index';

const ENTITY_STATES = [
    ...waterMethanolMixerRoute,
    ...waterMethanolMixerPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        WaterMethanolMixerComponent,
        WaterMethanolMixerDialogComponent,
        WaterMethanolMixerDeleteDialogComponent,
        WaterMethanolMixerPopupComponent,
        WaterMethanolMixerDeletePopupComponent,
    ],
    entryComponents: [
        WaterMethanolMixerComponent,
        WaterMethanolMixerDialogComponent,
        WaterMethanolMixerPopupComponent,
        WaterMethanolMixerDeleteDialogComponent,
        WaterMethanolMixerDeletePopupComponent,
    ],
    providers: [
        WaterMethanolMixerService,
        WaterMethanolMixerPopupService,
        WaterMethanolMixerResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayWaterMethanolMixerModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
