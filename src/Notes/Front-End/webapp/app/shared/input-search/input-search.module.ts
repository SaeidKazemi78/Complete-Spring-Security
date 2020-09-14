import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {InputSearchAfterTypedDirective} from './input-search.directive';
import {CommonModule} from '@angular/common';

@NgModule({
    declarations: [
        InputSearchAfterTypedDirective
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        InputSearchAfterTypedDirective
    ],
    providers: []
})
export class InputSearchAfterTypedModule {
}
