import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
import {
    InfringementComponent,
    InfringementDeleteDialogComponent,
    InfringementDeletePopupComponent,
    InfringementDialogComponent,
    InfringementPopupComponent,
    infringementPopupRoute,
    InfringementPopupService,
    InfringementResolvePagingParams,
    infringementRoute,
    InfringementService
} from './';
import {NiopdcgatewaySharedModule} from '../../shared/shared.module';
import {InfringementDeActiveDialogComponent, InfringementDeActivePopupComponent} from 'app/entities/infringement/infringement-deActive-dialog.component';
import {InfringementReportComponent} from 'app/entities/infringement/infringement-report.component';
// import { JoditAngularModule } from 'jodit-angular';

const ENTITY_STATES = [
    ...infringementRoute,
    ...infringementPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        InfringementComponent,
        InfringementDialogComponent,
        InfringementReportComponent,
        InfringementPopupComponent,
        InfringementDeleteDialogComponent,
        InfringementDeletePopupComponent,
        InfringementDeActiveDialogComponent,
        InfringementDeActivePopupComponent,
    ],
    entryComponents: [
        InfringementComponent,
        InfringementReportComponent,
        InfringementDialogComponent,
        InfringementPopupComponent,
        InfringementDeleteDialogComponent,
        InfringementDeletePopupComponent,
        InfringementDeActiveDialogComponent,
        InfringementDeActivePopupComponent,
    ],
    providers: [
        InfringementService,
        InfringementPopupService,
        InfringementResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayInfringementModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
