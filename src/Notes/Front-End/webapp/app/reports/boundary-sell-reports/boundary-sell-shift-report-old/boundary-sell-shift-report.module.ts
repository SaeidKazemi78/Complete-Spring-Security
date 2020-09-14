import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {NiopdcgatewaySharedModule} from '../../../shared';
import {RouterModule} from '@angular/router';
import {BoundarySellShiftReportService} from './boundary-sell-shift-report.service';
import {boundarySellShiftReportRoute} from './boundary-sell-shift-report.route';
import {BoundarySellShiftReportComponent} from './boundary-sell-shift-report.component';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forRoot(boundarySellShiftReportRoute, {useHash: true})
    ],
    declarations: [
        BoundarySellShiftReportComponent,
    ],
    entryComponents: [
        BoundarySellShiftReportComponent,
    ],
    providers: [
        BoundarySellShiftReportService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayBoundarySellShiftReportOldModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
