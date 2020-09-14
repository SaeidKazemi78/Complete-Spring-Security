import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {NiopdcgatewaySharedModule} from '../../../shared';
import {RouterModule} from '@angular/router';
import {customerStationInfoReportRoute} from './customer-station-info-report.route';
import {CustomerStationInfoReportComponent} from './customer-station-info-report.component';
import {CustomerStationInfoReportService} from './customer-station-info-report.service';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forRoot(customerStationInfoReportRoute, {useHash: true})
    ],
    declarations: [
        CustomerStationInfoReportComponent,
    ],
    entryComponents: [
        CustomerStationInfoReportComponent,
    ],
    providers: [
        CustomerStationInfoReportService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayCustomerStationInfoReportModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
