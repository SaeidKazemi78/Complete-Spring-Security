import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {NiopdcgatewaySharedModule} from '../../shared';
import {
    PersonChangeStatusDialogComponent,
    PersonChangeStatusPopupComponent,
    PersonComponent,
    PersonCreateUserDialogComponent,
    PersonCreateUserPopupComponent,
    PersonDeleteDialogComponent,
    PersonDeletePopupComponent,
    PersonDialogComponent,
    PersonPopupComponent,
    personPopupRoute,
    PersonPopupService,
    PersonRegisterDialogComponent,
    PersonResolvePagingParams,
    personRoute,
    PersonService,
    StakeholderDeleteDialogComponent, StakeholderDeletePopupComponent,
    StakeholderDetailComponent,
    StakeholderDialogComponent, StakeholderPopupComponent, StakeholderPopupService,
    StakeholderResolvePagingParams
} from './';
import {
    PersonCreditAccountDialogComponent,
    PersonCreditAccountPopupComponent
} from './person-credit-account-dialog.component';
import {PersonFinderComponent} from './person-finder.component';
import {StakeholderService} from './stakeholder.service';
import {NiopdcgatewayDepositIdentifierModule} from '../deposit-identifier/deposit-identifier.module';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from '../../core/language.helper';

const ENTITY_STATES = [
    ...personRoute,
    ...personPopupRoute,
    {
        path: ':personId/bank-account',
        loadChildren: '../bank-account/bank-account.module#NiopdcgatewayBankAccountModule'
    },
    {
        path: ':personId/person-credit',
        loadChildren: '../customer-credit/customer-credit.module#NiopdcgatewayCustomerCreditModule'
    },
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES),
        NiopdcgatewayDepositIdentifierModule
    ],
    declarations: [
        StakeholderDetailComponent,
        StakeholderDialogComponent,
        StakeholderDeleteDialogComponent,
        StakeholderPopupComponent,
        StakeholderDeletePopupComponent,
        PersonComponent,
        PersonDialogComponent,
        PersonRegisterDialogComponent,
        PersonDeleteDialogComponent,
        PersonPopupComponent,
        PersonDeletePopupComponent,
        PersonChangeStatusDialogComponent,
        PersonChangeStatusPopupComponent,
        PersonCreateUserDialogComponent,
        PersonCreateUserPopupComponent,
        PersonCreditAccountPopupComponent,
        PersonCreditAccountDialogComponent,
        PersonFinderComponent
    ],
    entryComponents: [
        StakeholderDialogComponent,
        StakeholderPopupComponent,
        StakeholderDeleteDialogComponent,
        StakeholderDeletePopupComponent,
        PersonComponent,
        PersonDialogComponent,
        PersonRegisterDialogComponent,
        PersonPopupComponent,
        PersonDeleteDialogComponent,
        PersonDeletePopupComponent,
        PersonChangeStatusDialogComponent,
        PersonChangeStatusPopupComponent,
        PersonCreateUserDialogComponent,
        PersonCreateUserPopupComponent,
        PersonCreditAccountPopupComponent,
        PersonCreditAccountDialogComponent,
        PersonFinderComponent
    ],
    providers: [
        StakeholderService,
        StakeholderPopupService,
        StakeholderResolvePagingParams,
        {provide: JhiLanguageService, useClass: JhiLanguageService},
        PersonService,
        PersonPopupService,
        PersonResolvePagingParams,
    ],
    exports: [
        PersonFinderComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayPersonModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
