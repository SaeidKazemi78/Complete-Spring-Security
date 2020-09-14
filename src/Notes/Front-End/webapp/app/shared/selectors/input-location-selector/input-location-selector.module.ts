import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TreeModule } from 'primeng/primeng';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/primeng';
import {InputLocationSelectorComponent} from './input-location-selector.component';
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
        InputLocationSelectorComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    exports: [
        InputLocationSelectorComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InputLocationSelectorModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
