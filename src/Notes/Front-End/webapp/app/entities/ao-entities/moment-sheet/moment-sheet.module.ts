import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
import {MomentSheetComponent, momentSheetRoute, MomentSheetService, MomentSheetsResolvePagingParams} from './index';
import {NiopdcgatewaySharedModule} from '../../../shared/shared.module';
// import { JoditAngularModule } from 'jodit-angular';
const ENTITY_STATES = [
    ...momentSheetRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, {useHash: true})
    ],
    declarations: [
        MomentSheetComponent,
    ],
    entryComponents: [
        MomentSheetComponent,
    ],
    providers: [
        MomentSheetService,
        MomentSheetsResolvePagingParams
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
