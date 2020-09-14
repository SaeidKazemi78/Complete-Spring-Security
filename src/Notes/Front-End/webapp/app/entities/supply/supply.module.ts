import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageService} from 'ng-jhipster';

import {NiopdcgatewaySharedModule} from '../../shared';
import {
    SupplyComponent,
    SupplyDeleteDialogComponent,
    SupplyDeletePopupComponent,
    SupplyDialogComponent,
    SupplyPopupComponent,
    supplyPopupRoute,
    SupplyPopupService,
    SupplyResolvePagingParams,
    supplyRoute,
    SupplyService,
} from './';
import {JhiLanguageHelper} from 'app/core/language.helper';

const ENTITY_STATES = [
    ...supplyRoute,
    ...supplyPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SupplyComponent,
        SupplyDialogComponent,
        SupplyDeleteDialogComponent,
        SupplyPopupComponent,
        SupplyDeletePopupComponent,
    ],
    entryComponents: [
        SupplyComponent,
        SupplyDialogComponent,
        SupplyPopupComponent,
        SupplyDeleteDialogComponent,
        SupplyDeletePopupComponent,
    ],
    providers: [
        SupplyService,
        SupplyPopupService,
        SupplyResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewaySupplyModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
