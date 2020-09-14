import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
import {NiopdcgatewaySharedModule} from '../../../shared/index';
import {
    TransferPlatformToUnitComponent,
    TransferPlatformToUnitDeleteDialogComponent,
    TransferPlatformToUnitDeletePopupComponent,
    TransferPlatformToUnitDialogComponent,
    TransferPlatformToUnitPopupComponent,
    transferPlatformToUnitPopupRoute,
    TransferPlatformToUnitPopupService,
    TransferPlatformToUnitResolvePagingParams,
    transferPlatformToUnitRoute,
    TransferPlatformToUnitService,
} from './index';

const ENTITY_STATES = [
    ...transferPlatformToUnitRoute,
    ...transferPlatformToUnitPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TransferPlatformToUnitComponent,
        TransferPlatformToUnitDialogComponent,
        TransferPlatformToUnitDeleteDialogComponent,
        TransferPlatformToUnitPopupComponent,
        TransferPlatformToUnitDeletePopupComponent,
    ],
    entryComponents: [
        TransferPlatformToUnitComponent,
        TransferPlatformToUnitDialogComponent,
        TransferPlatformToUnitPopupComponent,
        TransferPlatformToUnitDeleteDialogComponent,
        TransferPlatformToUnitDeletePopupComponent,
    ],
    providers: [
        TransferPlatformToUnitService,
        TransferPlatformToUnitPopupService,
        TransferPlatformToUnitResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayTransferPlatformToUnitModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
