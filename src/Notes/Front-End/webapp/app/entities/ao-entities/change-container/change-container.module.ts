import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
import {NiopdcgatewaySharedModule} from '../../../shared/index';
import {
    ChangeContainerComponent,
    ChangeContainerDeleteDialogComponent,
    ChangeContainerDeletePopupComponent,
    ChangeContainerDialogComponent,
    ChangeContainerPopupComponent,
    changeContainerPopupRoute,
    ChangeContainerPopupService,
    ChangeContainerResolvePagingParams,
    changeContainerRoute,
    ChangeContainerService,
} from './index';

const ENTITY_STATES = [
    ...changeContainerRoute,
    ...changeContainerPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ChangeContainerComponent,
        ChangeContainerDialogComponent,
        ChangeContainerDeleteDialogComponent,
        ChangeContainerPopupComponent,
        ChangeContainerDeletePopupComponent,
    ],
    entryComponents: [
        ChangeContainerComponent,
        ChangeContainerDialogComponent,
        ChangeContainerPopupComponent,
        ChangeContainerDeleteDialogComponent,
        ChangeContainerDeletePopupComponent,
    ],
    providers: [
        ChangeContainerService,
        ChangeContainerPopupService,
        ChangeContainerResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayChangeContainerModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
