import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {NiopdcgatewaySharedModule} from '../../../shared';
import {RouterModule} from '@angular/router';
import {NinePageService} from './nine-page.service';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
import {ninePageRoute} from "app/reports/ao-reports/nine-page/nine-page.route";
import {NinePageComponent} from "app/reports/ao-reports/nine-page/nine-page.component";
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forRoot(ninePageRoute, {useHash: true})
    ],
    declarations: [
        NinePageComponent,
    ],
    entryComponents: [
        NinePageComponent,
    ],
    providers: [
        NinePageService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayNinePageModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
