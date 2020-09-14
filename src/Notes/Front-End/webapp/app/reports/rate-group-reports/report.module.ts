import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {NiopdcgatewayRateGroupReportModule} from './rate-group/rate-group-report.module';

@NgModule({
    imports: [
        NiopdcgatewayRateGroupReportModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayRateReportModule {
}
