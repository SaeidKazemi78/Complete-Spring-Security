import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    ContainerService,
    ContainerPopupService,
    ContainerComponent,
    ContainerDialogComponent,
    ContainerPopupComponent,
    ContainerDeletePopupComponent,
    ContainerDeleteDialogComponent,
    containerRoute,
    containerPopupRoute,
    ContainerResolvePagingParams,
} from './';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core/language.helper';
const ENTITY_STATES = [
    ...containerRoute,
    ...containerPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ContainerComponent,
        ContainerDialogComponent,
        ContainerDeleteDialogComponent,
        ContainerPopupComponent,
        ContainerDeletePopupComponent,
    ],
    entryComponents: [
        ContainerComponent,
        ContainerDialogComponent,
        ContainerPopupComponent,
        ContainerDeleteDialogComponent,
        ContainerDeletePopupComponent,
    ],
    providers: [
        { provide: JhiLanguageService, useClass: JhiLanguageService },
        ContainerService,
        ContainerPopupService,
        ContainerResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayContainerModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
