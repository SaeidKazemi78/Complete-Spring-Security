import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {NiopdcgatewaySharedModule} from '../../../shared';
import {RouterModule} from '@angular/router';
import {sellProductToCompanyRoute} from './sell-product-to-company.route';
import {SellProductToCompanyComponent} from './sell-product-to-company.component';
import {SellProductToCompanyService} from './sell-product-to-company.service';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forRoot(sellProductToCompanyRoute, {useHash: true})
    ],
    declarations: [
        SellProductToCompanyComponent,
    ],
    entryComponents: [
        SellProductToCompanyComponent,
    ],
    providers: [
        SellProductToCompanyService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewaySellProductToCompanyModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
