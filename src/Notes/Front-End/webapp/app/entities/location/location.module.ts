import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
import {NiopdcgatewaySharedModule} from '../../shared';
import {
    LocationService,
    LocationPopupService,
    LocationComponent,
    LocationDialogComponent,
    LocationPopupComponent,
    LocationDeletePopupComponent,
    LocationDeleteDialogComponent,
    locationRoute,
    locationPopupRoute,
    LocationResolvePagingParams,
} from './';

import {NiopdcgatewayDepositIdentifierModule} from 'app/entities/deposit-identifier/deposit-identifier.module';

const ENTITY_STATES = [
    ...locationRoute,
    ...locationPopupRoute
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        NiopdcgatewayDepositIdentifierModule,
        // NiopdcgatewayOrderNumberModule,
        RouterModule.forChild(ENTITY_STATES),
    ],
    declarations: [
        LocationComponent,
        LocationDialogComponent,
        LocationDeleteDialogComponent,
        LocationPopupComponent,
        LocationDeletePopupComponent
    ],
    entryComponents: [
        LocationComponent,
        LocationDialogComponent,
        LocationPopupComponent,
        LocationDeleteDialogComponent,
        LocationDeletePopupComponent
    ],
    providers: [
        LocationService,
        LocationPopupService,
        LocationResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayLocationModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
