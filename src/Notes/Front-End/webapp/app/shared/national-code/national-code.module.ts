import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NationalCodeDirective} from './national-code.directive';
import {CommonModule} from '@angular/common';

@NgModule({
    declarations: [
        NationalCodeDirective
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        NationalCodeDirective
    ],
    providers: []
})
export class NationalCodeModule {
}
