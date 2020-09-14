import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {InputMaskDirective} from './input-mask.directive';
import {CommonModule} from '@angular/common';

@NgModule({
    declarations: [
        InputMaskDirective

    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        InputMaskDirective
    ],
    providers: []
})
export class InputMaskModule {
}
