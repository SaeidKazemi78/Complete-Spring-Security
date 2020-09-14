import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterModule} from '@angular/router';
import {NiopdcgatewaySharedModule} from '../../../shared/index';
import {boundarySellShiftNewReportRoute} from './boundary-sell-shift-new-report.route';
import {BoundarySellShiftNewReportComponent} from './boundary-sell-shift-new-report.component';
import {BoundarySellShiftNewReportService} from './boundary-sell-shift-new-report.service';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forRoot(boundarySellShiftNewReportRoute, {useHash: true})
    ],
    declarations: [
        BoundarySellShiftNewReportComponent,
    ],
    entryComponents: [
        BoundarySellShiftNewReportComponent,
    ],
    providers: [
        BoundarySellShiftNewReportService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayBoundarySellShiftNewReportModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
