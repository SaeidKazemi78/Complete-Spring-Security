import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    IpFilterService,
    IpFilterPopupService,
    IpFilterComponent,
    IpFilterDialogComponent,
    IpFilterPopupComponent,
    IpFilterDeletePopupComponent,
    IpFilterDeleteDialogComponent,
    ipFilterRoute,
    ipFilterPopupRoute,
    IpFilterResolvePagingParams,
} from './';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core/language.helper';

const ENTITY_STATES = [
    ...ipFilterRoute,
    ...ipFilterPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        IpFilterComponent,
        IpFilterDialogComponent,
        IpFilterDeleteDialogComponent,
        IpFilterPopupComponent,
        IpFilterDeletePopupComponent,
    ],
    entryComponents: [
        IpFilterComponent,
        IpFilterDialogComponent,
        IpFilterPopupComponent,
        IpFilterDeleteDialogComponent,
        IpFilterDeletePopupComponent,
    ],
    providers: [
        IpFilterService,
        IpFilterPopupService,
        IpFilterResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayIpFilterModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
