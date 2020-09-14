import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    DangerousCertificateService,
    DangerousCertificatePopupService,
    DangerousCertificateComponent,
    DangerousCertificateDialogComponent,
    DangerousCertificatePopupComponent,
    DangerousCertificateDeletePopupComponent,
    DangerousCertificateDeleteDialogComponent,
    dangerousCertificateRoute,
    dangerousCertificatePopupRoute,
    DangerousCertificateResolvePagingParams,
} from './';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core/language.helper';

const ENTITY_STATES = [
    ...dangerousCertificateRoute,
    ...dangerousCertificatePopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DangerousCertificateComponent,
        DangerousCertificateDialogComponent,
        DangerousCertificateDeleteDialogComponent,
        DangerousCertificatePopupComponent,
        DangerousCertificateDeletePopupComponent,
    ],
    entryComponents: [
        DangerousCertificateComponent,
        DangerousCertificateDialogComponent,
        DangerousCertificatePopupComponent,
        DangerousCertificateDeleteDialogComponent,
        DangerousCertificateDeletePopupComponent,
    ],
    providers: [
        DangerousCertificateService,
        DangerousCertificatePopupService,
        DangerousCertificateResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayDangerousCertificateModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
