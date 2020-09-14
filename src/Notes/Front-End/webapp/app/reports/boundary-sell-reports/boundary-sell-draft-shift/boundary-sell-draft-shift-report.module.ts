import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {NiopdcgatewaySharedModule} from '../../../shared';
import {RouterModule} from '@angular/router';
import {boundarySellDraftShiftReportRoute} from './boundary-sell-draft-shift-report.route';
import {BoundarySellDraftShiftReportComponent} from './boundary-sell-draft-shift-report.component';
import {BoundarySellDraftShiftReportService} from './boundary-sell-draft-shift-report.service';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forRoot(boundarySellDraftShiftReportRoute, {useHash: true})
    ],
    declarations: [
        BoundarySellDraftShiftReportComponent,
    ],
    entryComponents: [
        BoundarySellDraftShiftReportComponent,
    ],
    providers: [
        BoundarySellDraftShiftReportService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayBoundarySellShiftReportReportModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
