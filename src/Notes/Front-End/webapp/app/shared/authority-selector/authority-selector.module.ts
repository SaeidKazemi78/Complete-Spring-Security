import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {TreeModule, SharedModule, AccordionModule, TriStateCheckboxModule} from 'primeng/primeng';
import {CommonModule} from '@angular/common';
import {CheckboxModule} from 'primeng/primeng';
import {AuthoritySelectorComponent} from './authority-selector.component';
import {MultiStateCheckboxModule} from '../multi-state-checkbox/multi-state-checkbox.module';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AccordionModule,
        SharedModule,
        TriStateCheckboxModule,
        CheckboxModule,
        TreeModule,
        MultiStateCheckboxModule,
    ],
    declarations: [
        AuthoritySelectorComponent,
    ],
    entryComponents: [],
    providers: [
    ],
    exports: [
        AuthoritySelectorComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthoritySelectorModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
