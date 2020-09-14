import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
import { NiopdcgatewaySharedModule } from '../../shared';
import {
    DepotService,
    DepotPopupService,
    DepotComponent,
    DepotDialogComponent,
    DepotPopupComponent,
    DepotDeletePopupComponent,
    DepotDeleteDialogComponent,
    depotRoute,
    depotPopupRoute,
    DepotResolvePagingParams,
} from '.';

const ENTITY_STATES = [
    ...depotRoute,
    ...depotPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DepotComponent,
        DepotDialogComponent,
        DepotDeleteDialogComponent,
        DepotPopupComponent,
        DepotDeletePopupComponent,
    ],
    entryComponents: [
        DepotComponent,
        DepotDialogComponent,
        DepotPopupComponent,
        DepotDeleteDialogComponent,
        DepotDeletePopupComponent,
    ],
    providers: [
        { provide: JhiLanguageService, useClass: JhiLanguageService },
        DepotService,
        DepotPopupService,
        DepotResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayDepotModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
