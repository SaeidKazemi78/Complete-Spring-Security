import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AlertConverterDirective} from './alert-converter.directive';
import {CommonModule} from '@angular/common';

@NgModule({
    declarations: [
        AlertConverterDirective
    ],
    imports: [
        FormsModule,
        CommonModule
    ],
    exports: [
        AlertConverterDirective
    ],
    providers: []
})
export class AlertConverterModule {
}
