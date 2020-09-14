import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
import {NiopdcgatewaySharedModule} from '../../../shared/index';
import {
    TransferComponent,
    TransferDeleteDialogComponent,
    TransferDeletePopupComponent,
    TransferDialogComponent,
    TransferPopupComponent,
    transferPopupRoute,
    TransferPopupService,
    TransferResolvePagingParams,
    transferRoute,
    TransferService,
    TransferUnitToDirtyDialogComponent,
    TransferUnitToDirtyPopupComponent
} from './index';
import {
    TransferDepotToDirtyDialogComponent,
    TransferDepotToDirtyPopupComponent
} from './transfer-depot-to-dirty-dialog.component';
import {NiopdcgatewayTransferDirtyPopupModule} from "app/entities/ao-entities/transfer/transfer-dirty-popup.module";

const ENTITY_STATES = [
    ...transferRoute,
    ...transferPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        NiopdcgatewayTransferDirtyPopupModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TransferComponent,
        TransferDialogComponent,
        TransferDeleteDialogComponent,
        TransferPopupComponent,
        TransferDeletePopupComponent
    ],
    entryComponents: [
        TransferComponent,
        TransferDialogComponent,
        TransferPopupComponent,
        TransferDeleteDialogComponent,
        TransferDeletePopupComponent
    ],
    providers: [
        TransferService,
        TransferPopupService,
        TransferResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayTransferModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
