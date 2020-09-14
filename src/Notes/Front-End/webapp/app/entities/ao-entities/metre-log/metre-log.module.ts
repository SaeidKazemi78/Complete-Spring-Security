import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
import {NiopdcgatewaySharedModule} from '../../../shared/index';
import {
    MetreLogComponent,
    MetreLogDeleteDialogComponent,
    MetreLogDeletePopupComponent,
    MetreLogDialogComponent,
    MetreLogPopupComponent,
    metreLogPopupRoute,
    MetreLogPopupService,
    MetreLogResolvePagingParams,
    metreLogRoute,
    MetreLogService,
} from './index';

const ENTITY_STATES = [
    ...metreLogRoute,
    ...metreLogPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MetreLogComponent,
        MetreLogDialogComponent,
        MetreLogDeleteDialogComponent,
        MetreLogPopupComponent,
        MetreLogDeletePopupComponent,
    ],
    entryComponents: [
        MetreLogComponent,
        MetreLogDialogComponent,
        MetreLogPopupComponent,
        MetreLogDeleteDialogComponent,
        MetreLogDeletePopupComponent,
    ],
    providers: [
        MetreLogService,
        MetreLogPopupService,
        MetreLogResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayMetreLogModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
