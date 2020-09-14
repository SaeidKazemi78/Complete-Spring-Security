import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    CustomerService,
    CustomerPopupService,
    BoundaryDialogComponent
} from './';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {BoundaryPopupComponent} from './boundary-dialog.component';
import {boundaryCustomerPopupRouteEdit} from 'app/entities/customer/boundary-customer.route';
const ENTITY_STATES = [
    ...boundaryCustomerPopupRouteEdit
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BoundaryPopupComponent,
        BoundaryDialogComponent
    ],
    entryComponents: [
        BoundaryPopupComponent,
        BoundaryDialogComponent
    ],
    providers: [
        { provide: JhiLanguageService, useClass: JhiLanguageService },
        CustomerService,
        CustomerPopupService,

    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayBoundaryCustomerPopupModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
