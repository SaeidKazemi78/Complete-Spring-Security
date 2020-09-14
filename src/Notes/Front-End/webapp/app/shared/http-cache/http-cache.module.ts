import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import {HttpCacheService} from './http-cache.service';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [
        HttpCacheService
    ],
    exports: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HttpCacheModule {

}
