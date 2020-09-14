import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {NiopdcgatewaySharedModule} from '../../../shared';
import {RouterModule} from '@angular/router';
import {boundarySellInfringementReportRoute} from './boundary-sell-infringement-report.route';
import {BoundarySellInfringementReportComponent} from './boundary-sell-infringement-report.component';
import {BoundarySellInfringementReportService} from './boundary-sell-infringement-report.service';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forRoot(boundarySellInfringementReportRoute, {useHash: true})
    ],
    declarations: [
        BoundarySellInfringementReportComponent,
    ],
    entryComponents: [
        BoundarySellInfringementReportComponent,
    ],
    providers: [
        BoundarySellInfringementReportService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayBoundarySellInfringementReportModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
