import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {NiopdcgatewaySharedModule} from '../../../shared';
import {RouterModule} from '@angular/router';
import {AoMountReportRoute} from './ao-mount-report.route';
import {AoMountReportComponent} from './ao-mount-report.component';
import {AoMountReportService} from './ao-mount-report.service';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(AoMountReportRoute)
    ],
    declarations: [
        AoMountReportComponent,
    ],
    entryComponents: [
        AoMountReportComponent,
    ],
    providers: [
        { provide: JhiLanguageService, useClass: JhiLanguageService },
        AoMountReportService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayAoMountReportModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
