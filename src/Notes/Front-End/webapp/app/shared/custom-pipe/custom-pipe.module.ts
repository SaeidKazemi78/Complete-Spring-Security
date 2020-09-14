import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {InputMaskModule} from '../input-mask/input-mask.module';
import {TruncatePipe} from './truncate.pipe';
import {SortByPipe} from './sort-by.pipe';
import {SeparatorPipe} from './separator.pipe';
import {CommonModule} from '@angular/common';

@NgModule({
    declarations: [
        TruncatePipe,
        SortByPipe,
        SeparatorPipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        InputMaskModule
    ],
    exports: [
        TruncatePipe,
        SortByPipe,
        SeparatorPipe
    ],
    providers: []
})
export class CustomPipeModule {
}
