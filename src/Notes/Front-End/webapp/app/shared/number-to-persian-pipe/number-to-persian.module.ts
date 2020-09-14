import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NumberToPersianPipe} from './number-to-persian.pipe';
import {CommonModule} from '@angular/common';

@NgModule({
    declarations: [
        NumberToPersianPipe
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        NumberToPersianPipe
    ],
    providers: []
})
export class NumberToPersianPipeModule {
}
