import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {NiopdcgatewaySharedModule} from '../../../shared';
import {RouterModule} from '@angular/router';
import {boundaryDiscountSellReportRoute} from './boundary-sell-discount-report.route';
import {BoundaryDiscountSellReportComponent} from './boundary-sell-discount-report.component';
import {BoundaryDiscountSellReportService} from './boundary-sell-discount-report.service';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forRoot(boundaryDiscountSellReportRoute, {useHash: true})
    ],
    declarations: [
        BoundaryDiscountSellReportComponent,
    ],
    entryComponents: [
        BoundaryDiscountSellReportComponent,
    ],
    providers: [
        BoundaryDiscountSellReportService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayBoundaryDiscountSellReportModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
