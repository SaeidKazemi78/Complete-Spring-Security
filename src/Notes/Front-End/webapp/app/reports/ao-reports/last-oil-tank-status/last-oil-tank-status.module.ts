import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {NiopdcgatewaySharedModule} from '../../../shared';
import {RouterModule} from '@angular/router';
import {lastOilTankStatusRoute} from './last-oil-tank-status.route';
import {LastOilTankStatusComponent} from './last-oil-tank-status.component';
import {LastOilTankStatusService} from './last-oil-tank-status.service';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forRoot(lastOilTankStatusRoute, {useHash: true})
    ],
    declarations: [
        LastOilTankStatusComponent,
    ],
    entryComponents: [
        LastOilTankStatusComponent,
    ],
    providers: [
        LastOilTankStatusService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayLastOilTankStatusModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
