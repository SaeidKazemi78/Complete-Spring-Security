import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {NiopdcgatewaySharedModule} from '../../../shared';
import {RouterModule} from '@angular/router';
import {momentSheetRoute} from './moment-sheet.route';
import {MomentSheetAoComponent} from './moment-sheet-ao.component';
import {MomentSheetService} from './moment-sheet.service';
import {MomentSheetDepotComponent} from './moment-sheet-depot.component';
import {MomentSheetReportComponent} from './moment-sheet-report.component';
import {DepotMomentSheetComponent} from './depot-moment-sheet.component';
import {GroundMomentSheetComponent} from './ground-moment-sheet.component';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forRoot(momentSheetRoute, {useHash: true})
    ],
    declarations: [
        MomentSheetAoComponent,
        MomentSheetDepotComponent,
        MomentSheetReportComponent,
        DepotMomentSheetComponent,
        GroundMomentSheetComponent
    ],
    entryComponents: [
        MomentSheetAoComponent,
        MomentSheetDepotComponent,
        MomentSheetReportComponent,
        DepotMomentSheetComponent,
        GroundMomentSheetComponent
    ],
    providers: [
        MomentSheetService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayMomentSheetModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
