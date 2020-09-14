import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {NiopdcgatewaySharedModule} from '../../../shared';
import {RouterModule} from '@angular/router';
import {boundaryDetailsSellReportRoute} from './boundary-sell-details-report.route';
import {BoundaryDetailsSellReportComponent} from './boundary-sell-details-report.component';
import {BoundaryDetailsSellReportService} from './boundary-sell-details-report.service';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forRoot(boundaryDetailsSellReportRoute, {useHash: true})
    ],
    declarations: [
        BoundaryDetailsSellReportComponent,
    ],
    entryComponents: [
        BoundaryDetailsSellReportComponent,
    ],
    providers: [
        BoundaryDetailsSellReportService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayBoundaryDetailsSellReportModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
