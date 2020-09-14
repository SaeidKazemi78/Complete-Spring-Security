import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
import {NiopdcgatewaySharedModule} from '../../../shared/index';
import {
    TransferPopupService,
    TransferResolvePagingParams,
    TransferService,
    TransferUnitToDirtyDialogComponent,
    TransferUnitToDirtyPopupComponent
} from './index';
import {
    TransferDepotToDirtyDialogComponent,
    TransferDepotToDirtyPopupComponent
} from './transfer-depot-to-dirty-dialog.component';
import {transferDirtyPopupRoute} from "app/entities/ao-entities/transfer/transfer.route";

const ENTITY_STATES = [
    ...transferDirtyPopupRoute
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TransferUnitToDirtyDialogComponent,
        TransferUnitToDirtyPopupComponent,
        TransferDepotToDirtyDialogComponent,
        TransferDepotToDirtyPopupComponent
    ],
    entryComponents: [
        TransferUnitToDirtyDialogComponent,
        TransferUnitToDirtyPopupComponent,
        TransferDepotToDirtyDialogComponent,
        TransferDepotToDirtyPopupComponent
    ],
    providers: [
        TransferService,
        TransferPopupService,
        TransferResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayTransferDirtyPopupModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
