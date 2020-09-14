import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {NiopdcgatewaySharedModule} from '../../../shared';
import {RouterModule} from '@angular/router';
import {metreSheetRoute} from './metre-sheet.route';
import {MetreSheetAoComponent} from './metre-sheet-ao.component';
import {MetreSheetService} from './metre-sheet.service';
import {MetreSheetReportComponent} from './metre-sheet-report.component';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
import {MetreSheetDepotComponent} from "app/reports/ao-reports/metre-sheet/metre-sheet-depot.component";
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forRoot(metreSheetRoute, {useHash: true})
    ],
    declarations: [
        MetreSheetAoComponent,
        MetreSheetReportComponent,
        MetreSheetDepotComponent
    ],
    entryComponents: [
        MetreSheetAoComponent,
        MetreSheetReportComponent,
        MetreSheetDepotComponent
    ],
    providers: [
        MetreSheetService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayMetreSheetModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
