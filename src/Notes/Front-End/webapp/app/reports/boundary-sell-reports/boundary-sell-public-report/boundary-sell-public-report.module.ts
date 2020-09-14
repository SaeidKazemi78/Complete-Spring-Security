import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {NiopdcgatewaySharedModule} from '../../../shared';
import {RouterModule} from '@angular/router';
import {BoundarySellPublicReportService} from './boundary-sell-public-report.service';
import {boundarySellPublicReportRoute} from './boundary-sell-public-report.route';
import {BoundarySellPublicReportComponent} from './boundary-sell-public-report.component';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forRoot(boundarySellPublicReportRoute, {useHash: true})
    ],
    declarations: [
        BoundarySellPublicReportComponent,
    ],
    entryComponents: [
        BoundarySellPublicReportComponent,
    ],
    providers: [
        BoundarySellPublicReportService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayBoundarySellPublicReportModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
