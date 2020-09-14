import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    ProductUnitService,
    ProductUnitPopupService,
    ProductUnitComponent,
    ProductUnitDialogComponent,
    ProductUnitPopupComponent,
    ProductUnitDeletePopupComponent,
    ProductUnitDeleteDialogComponent,
    productUnitRoute,
    productUnitPopupRoute,
    ProductUnitResolvePagingParams,
} from './';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core/language.helper';

const ENTITY_STATES = [
    ...productUnitRoute,
    ...productUnitPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ProductUnitComponent,
        ProductUnitDialogComponent,
        ProductUnitDeleteDialogComponent,
        ProductUnitPopupComponent,
        ProductUnitDeletePopupComponent,
    ],
    entryComponents: [
        ProductUnitComponent,
        ProductUnitDialogComponent,
        ProductUnitPopupComponent,
        ProductUnitDeleteDialogComponent,
        ProductUnitDeletePopupComponent,
    ],
    providers: [
        { provide: JhiLanguageService, useClass: JhiLanguageService },
        ProductUnitService,
        ProductUnitPopupService,
        ProductUnitResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayProductUnitModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
