import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {NiopdcgatewaySharedModule} from '../../../shared';
import {RouterModule} from '@angular/router';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
import {ComparisonProductSellComponent} from 'app/reports/sell-reports/comparison-product-sell/comparison-product-sell.component';
import {comparisonProductSellRoute} from 'app/reports/sell-reports/comparison-product-sell/comparison-product-sell.route';
import {ComparisonProductSellService} from 'app/reports/sell-reports/comparison-product-sell/comparison-product-sell.service';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forRoot(comparisonProductSellRoute, {useHash: true})
    ],
    declarations: [
        ComparisonProductSellComponent,
    ],
    entryComponents: [
        ComparisonProductSellComponent,
    ],
    providers: [
        ComparisonProductSellService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayComparisonProductSellModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
