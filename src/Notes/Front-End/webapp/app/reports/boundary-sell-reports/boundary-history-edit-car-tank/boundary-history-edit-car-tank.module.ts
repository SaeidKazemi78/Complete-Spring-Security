import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {NiopdcgatewaySharedModule} from '../../../shared';
import {RouterModule} from '@angular/router';
import {boundaryHistoryEditCarTankRoute} from './boundary-history-edit-car-tank.route';
import {BoundaryHistoryEditCarTankComponent} from './boundary-history-edit-car-tank.component';
import {BoundaryHistoryEditCarTankService} from './boundary-history-edit-car-tank.service';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forRoot(boundaryHistoryEditCarTankRoute, {useHash: true})
    ],
    declarations: [
        BoundaryHistoryEditCarTankComponent,
    ],
    entryComponents: [
        BoundaryHistoryEditCarTankComponent,
    ],
    providers: [
        BoundaryHistoryEditCarTankService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayBoundaryHistoryEditCarTankModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
