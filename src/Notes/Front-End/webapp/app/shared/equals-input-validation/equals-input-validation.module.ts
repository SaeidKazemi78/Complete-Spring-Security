import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {EqualsInputValidationDirective} from './equals-input-validation.directive';
import {CommonModule} from '@angular/common';

@NgModule({
    declarations: [
        EqualsInputValidationDirective
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        EqualsInputValidationDirective
    ],
    providers: []
})
export class EqualsInputValidationModule {
}
