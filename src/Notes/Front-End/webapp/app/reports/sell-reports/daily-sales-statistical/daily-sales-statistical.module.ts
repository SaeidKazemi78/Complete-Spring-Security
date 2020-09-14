import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {NiopdcgatewaySharedModule} from '../../../shared';
import {RouterModule} from '@angular/router';
import {dailySalesStatisticalRoute} from './daily-sales-statistical.route';
import {DailySalesStatisticalComponent} from './daily-sales-statistical.component';
import {DailySalesStatisticalService} from './daily-sales-statistical.service';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forRoot(dailySalesStatisticalRoute, {useHash: true})
    ],
    declarations: [
        DailySalesStatisticalComponent,
    ],
    entryComponents: [
        DailySalesStatisticalComponent,
    ],
    providers: [
        DailySalesStatisticalService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayDailySalesStatisticalModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
