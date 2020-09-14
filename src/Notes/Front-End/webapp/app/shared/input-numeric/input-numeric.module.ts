import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {InputNumericDirective} from './input-numeric.directive';
import {CommonModule} from '@angular/common';

@NgModule({
    declarations: [
        InputNumericDirective

    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        InputNumericDirective
    ]

})
export class InputNumericModule {
}
