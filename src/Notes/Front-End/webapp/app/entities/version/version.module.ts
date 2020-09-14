import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
import {
    VersionComponent,
    VersionDeleteDialogComponent,
    VersionDeletePopupComponent,
    VersionDialogComponent,
    VersionPopupComponent,
    versionPopupRoute,
    VersionPopupService,
    VersionResolvePagingParams,
    versionRoute,
    VersionService, VersionShowPopupComponent
} from './';
import {NiopdcgatewaySharedModule} from '../../shared/shared.module';
// import { JoditAngularModule } from 'jodit-angular';

const ENTITY_STATES = [
    ...versionRoute,
    ...versionPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        VersionComponent,
        VersionDialogComponent,
        VersionDeleteDialogComponent,
        VersionPopupComponent,
        VersionDeletePopupComponent
    ],
    entryComponents: [
        VersionComponent,
        VersionDialogComponent,
        VersionPopupComponent,
        VersionDeleteDialogComponent,
        VersionDeletePopupComponent

    ],
    providers: [
        VersionService,
        VersionPopupService,
        VersionResolvePagingParams
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayVersionModule {
    private static VersionShowPopupComponent: any;
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
