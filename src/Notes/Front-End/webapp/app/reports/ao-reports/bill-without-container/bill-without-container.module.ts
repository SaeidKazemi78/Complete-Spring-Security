import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {NiopdcgatewaySharedModule} from '../../../shared';
import {RouterModule} from '@angular/router';
import {billWithoutContainerRoute} from './bill-without-container.route';
import {BillWithoutContainerComponent} from './bill-without-container.component';
import {BillWithoutContainerService} from './bill-without-container.service';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forRoot(billWithoutContainerRoute, {useHash: true})
    ],
    declarations: [
        BillWithoutContainerComponent,
    ],
    entryComponents: [
        BillWithoutContainerComponent,
    ],
    providers: [
        BillWithoutContainerService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayBillWithoutContainerModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
