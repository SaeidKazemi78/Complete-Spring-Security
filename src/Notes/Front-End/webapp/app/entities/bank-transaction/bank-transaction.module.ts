import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    BankTransactionService
} from './';

@NgModule({
    imports: [
        NiopdcgatewaySharedModule
    ],
    providers: [
        BankTransactionService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayBankTransactionModule {}
