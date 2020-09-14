import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import {
    ActionLogComponent,
    ActionLogResolvePagingParams,
    ActionLogDialogComponent,
    ActionLogPopupComponent,
    ActionLogMappingDialogComponent,
    ActionLogMappingPopupComponent,
    actionLogPopupRoute,
    ActionLogPopupService,
    actionLogRoute,
    ActionLogService
} from './';
import {NiopdcgatewaySharedModule} from '../../shared/shared.module';

const ENTITY_STATES = [
    ...actionLogRoute,
    ...actionLogPopupRoute
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        NgxJsonViewerModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ActionLogComponent,
        ActionLogPopupComponent,
        ActionLogDialogComponent,
        ActionLogMappingDialogComponent,
        ActionLogMappingPopupComponent,
    ],
    entryComponents: [
        ActionLogComponent,
        ActionLogPopupComponent,
        ActionLogDialogComponent,
        ActionLogMappingDialogComponent,
        ActionLogMappingPopupComponent,
    ],
    providers: [
        ActionLogService,
        ActionLogPopupService,
        ActionLogResolvePagingParams
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayActionLogModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
