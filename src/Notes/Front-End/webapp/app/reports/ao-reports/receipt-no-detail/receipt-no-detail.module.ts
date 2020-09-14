import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {NiopdcgatewaySharedModule} from '../../../shared';
import {RouterModule} from '@angular/router';
import {receiptNoDetailRoute} from './receipt-no-detail.route';
import {ReceiptNoDetailComponent} from './receipt-no-detail.component';
import {ReceiptNoDetailService} from './receipt-no-detail.service';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forRoot(receiptNoDetailRoute, {useHash: true})
    ],
    declarations: [
        ReceiptNoDetailComponent,
    ],
    entryComponents: [
        ReceiptNoDetailComponent,
    ],
    providers: [
        ReceiptNoDetailService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayReceiptNoDetailModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
