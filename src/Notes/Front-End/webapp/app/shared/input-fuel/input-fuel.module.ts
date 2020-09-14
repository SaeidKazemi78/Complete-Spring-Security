import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {InputFuelDirective} from './input-fuel.directive';
import {CommonModule} from '@angular/common';

@NgModule({
    declarations: [
        InputFuelDirective

    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        InputFuelDirective
    ]

})
export class InputFuelModule {
}
