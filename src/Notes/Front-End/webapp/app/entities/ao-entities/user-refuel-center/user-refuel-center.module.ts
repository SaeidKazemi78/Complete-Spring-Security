import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
import {NiopdcgatewaySharedModule} from '../../../shared/index';
import {
    UserRefuelCenterDialogComponent,
    UserRefuelCenterPopupComponent,
    userRefuelCenterPopupRoute,
    UserRefuelCenterPopupService,
    UserRefuelCenterResolvePagingParams,
    UserRefuelCenterService,
} from './index';

const ENTITY_STATES = [
    ...userRefuelCenterPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        UserRefuelCenterDialogComponent,
        UserRefuelCenterPopupComponent,
    ],
    entryComponents: [
        UserRefuelCenterDialogComponent,
        UserRefuelCenterPopupComponent,
    ],
    providers: [
        UserRefuelCenterService,
        UserRefuelCenterPopupService,
        UserRefuelCenterResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayUserRefuelCenterModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
