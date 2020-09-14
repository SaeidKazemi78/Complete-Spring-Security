import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterModule} from '@angular/router';

import {NiopdcgatewaySharedModule} from '../../shared';

import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {userAccConfigRoute} from 'app/entities/user-acc-config/user-acc-config.route';
import {UserAccConfigComponent} from 'app/entities/user-acc-config/user-acc-config.component';
import {UserAccConfigService} from 'app/entities/user-acc-config/user-acc-config.service';

const ENTITY_STATES = [
    ...userAccConfigRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        UserAccConfigComponent,
    ],
    entryComponents: [
        UserAccConfigComponent,
    ],
    providers: [
        { provide: JhiLanguageService, useClass: JhiLanguageService },
        UserAccConfigService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayUserAccConfigModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
