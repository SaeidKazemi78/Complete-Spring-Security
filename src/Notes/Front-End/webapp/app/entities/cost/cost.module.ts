import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
import {NiopdcgatewaySharedModule} from '../../shared';
import {
    CostComponent,
    CostDeleteDialogComponent,
    CostDeletePopupComponent,
    CostDialogComponent,
    CostPopupComponent,
    costPopupRoute,
    CostPopupService,
    CostResolvePagingParams,
    costRoute,
    CostService,
} from './';

const ENTITY_STATES = [
    ...costRoute,
    ...costPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CostComponent,
        CostDialogComponent,
        CostDeleteDialogComponent,
        CostPopupComponent,
        CostDeletePopupComponent,
    ],
    entryComponents: [
        CostComponent,
        CostDialogComponent,
        CostPopupComponent,
        CostDeleteDialogComponent,
        CostDeletePopupComponent,
    ],
    providers: [
        CostService,
        CostPopupService,
        CostResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayCostModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
