import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {NiopdcgatewaySharedModule} from '../../../shared';
import {RouterModule} from '@angular/router';
import {boundarySellPenaltyReportRoute} from './boundary-sell-penalty-report.route';
import {BoundarySellPenaltyReportComponent} from './boundary-sell-penalty-report.component';
import {BoundarySellPenaltyReportService} from './boundary-sell-penalty-report.service';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forRoot(boundarySellPenaltyReportRoute, {useHash: true})
    ],
    declarations: [
        BoundarySellPenaltyReportComponent,
    ],
    entryComponents: [
        BoundarySellPenaltyReportComponent,
    ],
    providers: [
        BoundarySellPenaltyReportService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayBoundarySellPenaltyReportModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
