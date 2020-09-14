import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import {RegionSelectorComponent} from './region-selector.component';
import {TreeModule} from 'primeng/primeng';
import { CommonModule } from '@angular/common';
import {CheckboxModule} from 'primeng/primeng';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
@NgModule({
    imports: [
        CommonModule,
        TreeModule,
        CheckboxModule
    ],
    declarations: [
        RegionSelectorComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    exports: [
        RegionSelectorComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RegionSelectorModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
