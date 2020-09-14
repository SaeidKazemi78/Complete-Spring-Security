import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    ProductGroupService,
    ProductGroupPopupService,
    ProductGroupComponent,
    ProductGroupDialogComponent,
    ProductGroupPopupComponent,
    ProductGroupDeletePopupComponent,
    ProductGroupDeleteDialogComponent,
    productGroupRoute,
    productGroupPopupRoute,
    ProductGroupResolvePagingParams,
} from './';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core/language.helper';

const ENTITY_STATES = [
    ...productGroupRoute,
    ...productGroupPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ProductGroupComponent,
        ProductGroupDialogComponent,
        ProductGroupDeleteDialogComponent,
        ProductGroupPopupComponent,
        ProductGroupDeletePopupComponent,
    ],
    entryComponents: [
        ProductGroupComponent,
        ProductGroupDialogComponent,
        ProductGroupPopupComponent,
        ProductGroupDeleteDialogComponent,
        ProductGroupDeletePopupComponent,
    ],
    providers: [
        { provide: JhiLanguageService, useClass: JhiLanguageService },
        ProductGroupService,
        ProductGroupPopupService,
        ProductGroupResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayProductGroupModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
