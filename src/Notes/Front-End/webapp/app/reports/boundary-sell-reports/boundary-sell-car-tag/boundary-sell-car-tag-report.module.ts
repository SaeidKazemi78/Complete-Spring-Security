import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {NiopdcgatewaySharedModule} from '../../../shared';
import {RouterModule} from '@angular/router';
import {boundarySellCarTagReportRoute} from './boundary-sell-car-tag-report.route';
import {BoundarySellCarTagReportComponent} from './boundary-sell-car-tag-report.component';
import {BoundarySellCarTagReportService} from './boundary-sell-car-tag-report.service';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
import {DxDataGridModule, DxTemplateModule} from 'devextreme-angular';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        DxDataGridModule,
        DxTemplateModule,
        RouterModule.forRoot(boundarySellCarTagReportRoute, {useHash: true})
    ],
    declarations: [
        BoundarySellCarTagReportComponent,
    ],
    entryComponents: [
        BoundarySellCarTagReportComponent,
    ],
    providers: [
        BoundarySellCarTagReportService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayBoundarySellCarTagReportModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
