import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {CheckboxModule, TreeModule} from 'primeng/primeng';
import {CommonModule} from '@angular/common';
import {InputRegionSelectorComponent} from './input-region-selector.component';
import {FormsModule} from '@angular/forms';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
@NgModule({
    imports: [
        CommonModule,
        TreeModule,
        CheckboxModule,
        FormsModule
    ],
    declarations: [
        InputRegionSelectorComponent,
    ],
    entryComponents: [],
    providers: [],
    exports: [
        InputRegionSelectorComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InputRegionSelectorModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
