import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {NiopdcgatewaySharedModule} from '../../../shared';
import {RouterModule} from '@angular/router';
import {boundaryDiscountDetailsSellReportRoute} from './boundary-sell-discount-details-report.route';
import {BoundaryDiscountDetailsSellReportComponent} from './boundary-sell-discount-details-report.component';
import {BoundaryDiscountDetailsSellReportService} from './boundary-sell-discount-details-report.service';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';

/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forRoot(boundaryDiscountDetailsSellReportRoute, {useHash: true})
    ],
    declarations: [
        BoundaryDiscountDetailsSellReportComponent,
    ],
    entryComponents: [
        BoundaryDiscountDetailsSellReportComponent,
    ],
    providers: [
        BoundaryDiscountDetailsSellReportService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayBoundaryDiscountDetailsSellReportModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
