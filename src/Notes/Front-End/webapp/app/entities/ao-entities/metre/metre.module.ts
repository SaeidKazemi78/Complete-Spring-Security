import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
import {NiopdcgatewaySharedModule} from '../../../shared';
import {
    MetreComponent,
    MetreDeleteDialogComponent,
    MetreDeletePopupComponent,
    MetreDialogComponent,
    MetrePopupComponent,
    metrePopupRoute,
    MetrePopupService,
    MetreResolvePagingParams,
    metreRoute,
    MetreService,
} from './index';

const ENTITY_STATES = [
    ...metreRoute,
    ...metrePopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MetreComponent,
        MetreDialogComponent,
        MetreDeleteDialogComponent,
        MetrePopupComponent,
        MetreDeletePopupComponent,
    ],
    entryComponents: [
        MetreComponent,
        MetreDialogComponent,
        MetrePopupComponent,
        MetreDeleteDialogComponent,
        MetreDeletePopupComponent,
    ],
    providers: [
        MetreService,
        MetrePopupService,
        MetreResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayMetreModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
