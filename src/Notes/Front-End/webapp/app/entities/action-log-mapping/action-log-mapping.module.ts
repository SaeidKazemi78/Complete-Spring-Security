import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
import {NgxJsonViewerModule} from 'ngx-json-viewer';
import {
    ActionLogMappingComponent,
    ActionLogMappingDialogComponent,
    ActionLogMappingDeleteDialogComponent,
    ActionLogMappingPopupComponent,
    ActionLogMappingDeletePopupComponent,
    actionLogMappingPopupRoute,
    ActionLogMappingPopupService,
    ActionLogMappingResolvePagingParams,
    actionLogMappingRoute,
    ActionLogMappingService,
} from './';
import {NiopdcgatewaySharedModule} from '../../shared/shared.module';

const ENTITY_STATES = [
    ...actionLogMappingRoute,
    ...actionLogMappingPopupRoute
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        NgxJsonViewerModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ActionLogMappingComponent,
        ActionLogMappingDialogComponent,
        ActionLogMappingDeleteDialogComponent,
        ActionLogMappingDeletePopupComponent,
        ActionLogMappingPopupComponent,
    ],
    entryComponents: [
        ActionLogMappingComponent,
        ActionLogMappingDialogComponent,
        ActionLogMappingPopupComponent,
        ActionLogMappingDeleteDialogComponent,
        ActionLogMappingDeletePopupComponent,
    ],
    providers: [
        ActionLogMappingService,
        ActionLogMappingPopupService,
        ActionLogMappingResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayActionLogMappingModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
