import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
import {NiopdcgatewaySharedModule} from '../../../shared/index';
import {
    FilterComponent,
    FilterDeleteDialogComponent,
    FilterDeletePopupComponent,
    FilterDialogComponent,
    FilterPopupComponent,
    filterPopupRoute,
    FilterPopupService,
    FilterResolvePagingParams,
    filterRoute,
    FilterService,
} from './index';

const ENTITY_STATES = [
    ...filterRoute,
    ...filterPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FilterComponent,
        FilterDialogComponent,
        FilterDeleteDialogComponent,
        FilterPopupComponent,
        FilterDeletePopupComponent,
    ],
    entryComponents: [
        FilterComponent,
        FilterDialogComponent,
        FilterPopupComponent,
        FilterDeleteDialogComponent,
        FilterDeletePopupComponent,
    ],
    providers: [
        FilterService,
        FilterPopupService,
        FilterResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayFilterModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
