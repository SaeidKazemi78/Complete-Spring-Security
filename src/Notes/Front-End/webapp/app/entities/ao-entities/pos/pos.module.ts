import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
import {NiopdcgatewaySharedModule} from '../../../shared/index';
import {
    PosComponent,
    PosDeleteDialogComponent,
    PosDeletePopupComponent,
    PosDialogComponent,
    PosPopupComponent,
    posPopupRoute,
    PosPopupService,
    PosResolvePagingParams,
    posRoute,
    PosService,
} from './index';

const ENTITY_STATES = [
    ...posRoute,
    ...posPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, {useHash: true})
    ],
    declarations: [
        PosComponent,
        PosDialogComponent,
        PosDeleteDialogComponent,
        PosPopupComponent,
        PosDeletePopupComponent,
    ],
    entryComponents: [
        PosComponent,
        PosDialogComponent,
        PosPopupComponent,
        PosDeleteDialogComponent,
        PosDeletePopupComponent,
    ],
    providers: [
        PosService,
        PosPopupService,
        PosResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayPosModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
