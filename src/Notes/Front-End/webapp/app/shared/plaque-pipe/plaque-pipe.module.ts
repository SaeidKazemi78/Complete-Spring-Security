import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {InputMaskModule} from '../input-mask/input-mask.module';
import {PlaqueFormatPipe} from './plaque-pipe';
import {CommonModule} from '@angular/common';

@NgModule({
    declarations: [
        PlaqueFormatPipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        InputMaskModule
    ],
    exports: [
        PlaqueFormatPipe
    ],
    providers: []
})
export class PlaqueFormatPipeModule {
}
