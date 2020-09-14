import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    CeilingQuotaService,
    CeilingQuotaPopupService,
    CeilingQuotaComponent,
    CeilingQuotaDialogComponent,
    CeilingQuotaPopupComponent,
    CeilingQuotaDeletePopupComponent,
    CeilingQuotaDeleteDialogComponent,
    ceilingQuotaRoute,
    ceilingQuotaPopupRoute,
    CeilingQuotaResolvePagingParams,
} from './';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core/language.helper';

const ENTITY_STATES = [
    ...ceilingQuotaRoute,
    ...ceilingQuotaPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CeilingQuotaComponent,
        CeilingQuotaDialogComponent,
        CeilingQuotaDeleteDialogComponent,
        CeilingQuotaPopupComponent,
        CeilingQuotaDeletePopupComponent,
    ],
    entryComponents: [
        CeilingQuotaComponent,
        CeilingQuotaDialogComponent,
        CeilingQuotaPopupComponent,
        CeilingQuotaDeleteDialogComponent,
        CeilingQuotaDeletePopupComponent,
    ],
    providers: [
        { provide: JhiLanguageService, useClass: JhiLanguageService },
        CeilingQuotaService,
        CeilingQuotaPopupService,
        CeilingQuotaResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayCeilingQuotaModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
