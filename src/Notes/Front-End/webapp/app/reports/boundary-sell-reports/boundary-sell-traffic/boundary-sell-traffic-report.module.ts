import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {NiopdcgatewaySharedModule} from '../../../shared';
import {RouterModule} from '@angular/router';
import {boundarySellTrafficReportRoute} from './boundary-sell-traffic-report.route';
import {BoundarySellTrafficReportComponent} from './boundary-sell-traffic-report.component';
import {BoundarySellTrafficReportService} from './boundary-sell-traffic-report.service';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forRoot(boundarySellTrafficReportRoute, {useHash: true})
    ],
    declarations: [
        BoundarySellTrafficReportComponent,
    ],
    entryComponents: [
        BoundarySellTrafficReportComponent,
    ],
    providers: [
        BoundarySellTrafficReportService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayBoundarySellTrafficReportModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
