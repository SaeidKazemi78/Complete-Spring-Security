import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {NiopdcgatewaySharedModule} from '../../../shared';
import {RouterModule} from '@angular/router';
import {InvoiceSellReportComponent} from './invoice-report.component';
import {InvoiceSellReportRoute} from './invoice-report.route';
import { InvoiceSellReportService} from './invoice-report.service';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forRoot(InvoiceSellReportRoute, {useHash: true})
    ],
    declarations: [
        InvoiceSellReportComponent,
    ],
    entryComponents: [
        InvoiceSellReportComponent,
    ],
    providers: [
        InvoiceSellReportService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayInvoiceSellReportModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
