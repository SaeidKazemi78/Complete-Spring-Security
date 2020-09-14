import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterModule} from '@angular/router';

import {NiopdcgatewaySharedModule} from '../../shared';
import {
    ExportLetterService,
    ExportLetterPopupService,
    ExportLetterComponent,
    ExportLetterDialogComponent,
    ExportLetterPopupComponent,
    ExportLetterDeletePopupComponent,
    ExportLetterDeleteDialogComponent,
    exportLetterRoute,
    exportLetterPopupRoute,
    ExportLetterResolvePagingParams,
} from './';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {ExportLetterActiveDialogComponent, ExportLetterActivePopupComponent} from 'app/entities/export-letter/export-letter-active-dialog.component';

const ENTITY_STATES = [
    ...exportLetterRoute,
    ...exportLetterPopupRoute,
    {
        path: ':exportLetterId/export-pi',
        loadChildren: '../export-pi/export-pi.module#NiopdcgatewayExportPiModule'
    },
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ExportLetterComponent,
        ExportLetterDialogComponent,
        ExportLetterDeleteDialogComponent,
        ExportLetterActiveDialogComponent,
        ExportLetterPopupComponent,
        ExportLetterDeletePopupComponent,
        ExportLetterActivePopupComponent,
    ],
    entryComponents: [
        ExportLetterComponent,
        ExportLetterDialogComponent,
        ExportLetterPopupComponent,
        ExportLetterDeleteDialogComponent,
        ExportLetterDeletePopupComponent,
        ExportLetterActiveDialogComponent,
        ExportLetterActivePopupComponent,
    ],
    providers: [
        ExportLetterService,
        ExportLetterPopupService,
        ExportLetterResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayExportLetterModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
