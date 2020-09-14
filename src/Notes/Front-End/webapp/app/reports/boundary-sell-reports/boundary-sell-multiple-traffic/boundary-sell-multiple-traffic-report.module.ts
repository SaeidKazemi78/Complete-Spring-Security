import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {NiopdcgatewaySharedModule} from '../../../shared';
import {RouterModule} from '@angular/router';
import {boundarySellMultipleTrafficReportRoute} from './boundary-sell-multiple-traffic-report.route';
import {BoundarySellMultipleTrafficReportComponent} from './boundary-sell-multiple-traffic-report.component';
import {BoundarySellMultipleTrafficReportService} from './boundary-sell-multiple-traffic-report.service';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forRoot(boundarySellMultipleTrafficReportRoute, {useHash: true})
    ],
    declarations: [
        BoundarySellMultipleTrafficReportComponent,
    ],
    entryComponents: [
        BoundarySellMultipleTrafficReportComponent,
    ],
    providers: [
        BoundarySellMultipleTrafficReportService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayBoundarySellMultipleTrafficReportModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
