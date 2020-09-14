import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import {TabViewModule} from 'primeng/primeng';
import { NiopdcgatewaySharedModule } from '../../shared';
import {
    VoucherTemplateService,
    VoucherTemplatePopupService,
    VoucherTemplateComponent,
    VoucherTemplateDialogComponent,
    VoucherTemplateDeletePopupComponent,
    VoucherTemplateDeleteDialogComponent,
    VoucherTemplateExecuteQueryPopupComponent,
    VoucherTemplateExecuteQueryDialogComponent,
    voucherTemplateRoute,
    voucherTemplatePopupRoute,
    VoucherTemplateResolvePagingParams,
} from './';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core/language.helper';

const ENTITY_STATES = [
    ...voucherTemplateRoute,
    ...voucherTemplatePopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        TabViewModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        VoucherTemplateComponent,
        VoucherTemplateDialogComponent,
        VoucherTemplateDeleteDialogComponent,
        VoucherTemplateExecuteQueryDialogComponent,
        VoucherTemplateDeletePopupComponent,
        VoucherTemplateExecuteQueryPopupComponent,
    ],
    entryComponents: [
        VoucherTemplateComponent,
        VoucherTemplateDialogComponent,
        VoucherTemplateDeleteDialogComponent,
        VoucherTemplateDeletePopupComponent,
        VoucherTemplateExecuteQueryPopupComponent,
        VoucherTemplateExecuteQueryDialogComponent,
    ],
    providers: [
        { provide: JhiLanguageService, useClass: JhiLanguageService },
        VoucherTemplateService,
        VoucherTemplatePopupService,
        VoucherTemplateResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayVoucherTemplateModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
