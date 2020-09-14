import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {NiopdcgatewaySharedModule} from '../../../shared';
import {RouterModule} from '@angular/router';
import {boundarySellCarTagsReportRoute} from './boundary-sell-car-tags-report.route';
import {BoundarySellCarTagsReportComponent} from './boundary-sell-car-tags-report.component';
import {BoundarySellCarTagsReportService} from './boundary-sell-car-tags-report.service';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
import {DxDataGridModule, DxTemplateModule} from 'devextreme-angular';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        DxDataGridModule,
        DxTemplateModule,
        RouterModule.forRoot(boundarySellCarTagsReportRoute, {useHash: true})
    ],
    declarations: [
        BoundarySellCarTagsReportComponent,
    ],
    entryComponents: [
        BoundarySellCarTagsReportComponent,
    ],
    providers: [
        BoundarySellCarTagsReportService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayBoundarySellCarTagsReportModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
