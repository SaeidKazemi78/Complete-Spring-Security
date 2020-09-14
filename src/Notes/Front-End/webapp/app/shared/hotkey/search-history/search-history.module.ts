import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import {SearchHistoryService} from './search-history.service';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';

@NgModule({
    providers: [
        SearchHistoryService
    ],
    exports: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SearchHistoryModule {

}
