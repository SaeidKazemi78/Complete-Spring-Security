import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {NiopdcgatewaySharedModule} from '../../../shared';
import {RouterModule} from '@angular/router';
import {twentyFourAoRoute} from './twenty-four-ao.route';
import {TwentyFourAoComponent} from './twenty-four-ao.component';
import {TwentyFourAoService} from './twenty-four-ao.service';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forRoot(twentyFourAoRoute, {useHash: true})
    ],
    declarations: [
        TwentyFourAoComponent,
    ],
    entryComponents: [
        TwentyFourAoComponent,
    ],
    providers: [
        TwentyFourAoService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayTwentyFourAoModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
