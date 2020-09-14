import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {NiopdcgatewayServiceOilTankModule} from './service-oil-tank/service-oil-tank.module';
import {NiopdcgatewayMeasurementOilTankModule} from './measurement-oil-tank/measurement-oil-tank.module';
import {NiopdcgatewaySendProductModule} from './send-product/send-product.module';
import {NiopdcgatewaySendContainerProductModule} from './send-container-product/send-container-product.module';
import {NiopdcgatewayTransferModule} from './transfer/transfer.module';
import {NiopdcgatewayTransferPlatformToUnitModule} from './transfer-platform-to-unit/transfer-platform-to-unit.module';
import {NiopdcgatewayReceivedProductModule} from './received-product/received-product.module';
import {NiopdcgatewayReceivedProductContainerModule} from './received-product-container/received-product-container.module';
import {NiopdcgatewayLogBookModule} from './log-book/log-book.module';
import {NiopdcgatewayMainDayDepotModule} from './main-day-depot/main-day-depot.module';
import {NiopdcgatewayMainDayOperationModule} from './main-day-operation/main-day-operation.module';
import {NiopdcgatewayDayDepotModule} from './day-depot/day-depot.module';
import {NiopdcgatewayDayDepotServiceOilTankModule} from './day-depot-service-oil-tank/day-depot-service-oil-tank.module';
import {NiopdcgatewayDayDepotContainerModule} from './day-depot-container/day-depot-container.module';
import {NiopdcgatewaySellGroundFuelModule} from './sell-ground-fuel/sell-ground-fuel.module';
import {NiopdcgatewayLiteratureVolumeOilTankModule} from './literature-volume-oil-tank/literature-volume-oil-tank.module';
import {NiopdcgatewayOilTankContainerModule} from './oil-tank-container/oil-tank-container.module';
import {NiopdcgatewayChangeContainerModule} from './change-container/change-container.module';
import {NiopdcgatewayWaterMethanolMixerModule} from './water-methanol-mixer/water-methanol-mixer.module';
import {NiopdcgatewayCleaningReportOilTankModule} from './cleaning-report-oil-tank/cleaning-report-oil-tank.module';
import {NiopdcgatewayMilliPoorModule} from './milli-poor/milli-poor.module';
import {NiopdcgatewayRequestTestResultModule} from './request-test-result/request-test-result.module';
import {NiopdcgatewayTestResultModule} from './test-result/test-result.module';
import {NiopdcgatewayRequestFilterElementModule} from './request-filter-element/request-filter-element.module';
import {NiopdcgatewayChangeFilterElementModule} from './change-filter-element/change-filter-element.module';
import {NiopdcgatewayMomentSheetModule} from './moment-sheet/moment-sheet.module';
import {NiopdcgatewayRequestPlungingModule} from './request-plunging/request-plunging.module';
import {NiopdcgatewayResponsePlungingModule} from './response-plunging/response-plunging.module';
import {NiopdcgatewayRefuelCenterModule} from './refuel-center/refuel-center.module';
import {NiopdcgatewayUserRefuelCenterModule} from './user-refuel-center/user-refuel-center.module';
import {NiopdcgatewayPosModule} from './pos/pos.module';
import {NiopdcgatewayParentBaseTestResultModule} from './parent-base-test-result/parent-base-test-result.module';
import {NiopdcgatewayBaseTestResultModule} from './base-test-result/base-test-result.module';
import {NiopdcgatewayChangeRequestElementModule} from './change-request-element/change-request-element.module';
import {NiopdcgatewayElementModule} from './element/element.module';
import {NiopdcgatewayLastChangeDateElementModule} from './last-change-date-element/last-change-date-element.module';
import {NiopdcgatewayMetreModule} from './metre/metre.module';
import {NiopdcgatewayRequestElementModule} from './request-element/request-element.module';
import {NiopdcgatewayTestResultMappingModule} from './test-result-mapping/test-result-mapping.module';
import {NiopdcgatewayAirportModule} from './airport/airport.module';
import {NiopdcgatewayOilTankModule} from './oil-tank/oil-tank.module';
import {NiopdcgatewayMetreLogModule} from './metre-log/metre-log.module';
import {NiopdcgatewayFilterModule} from './filter/filter.module';

/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        NiopdcgatewayRefuelCenterModule,
        NiopdcgatewayMomentSheetModule,
        NiopdcgatewayServiceOilTankModule,
        NiopdcgatewayMeasurementOilTankModule,
        NiopdcgatewaySendProductModule,
        NiopdcgatewaySendContainerProductModule,
        NiopdcgatewayTransferModule,
        NiopdcgatewayTransferPlatformToUnitModule,
        NiopdcgatewayReceivedProductModule,
        NiopdcgatewayReceivedProductContainerModule,
        NiopdcgatewayLogBookModule,
        NiopdcgatewayMainDayDepotModule,
        NiopdcgatewayMainDayOperationModule,
        NiopdcgatewayDayDepotModule,
        NiopdcgatewayDayDepotServiceOilTankModule,
        NiopdcgatewayDayDepotContainerModule,
        NiopdcgatewaySellGroundFuelModule,
        NiopdcgatewayLiteratureVolumeOilTankModule,
        NiopdcgatewayOilTankContainerModule,
        NiopdcgatewayChangeContainerModule,
        NiopdcgatewayWaterMethanolMixerModule,
        NiopdcgatewayUserRefuelCenterModule,
        NiopdcgatewayCleaningReportOilTankModule,
        NiopdcgatewayMilliPoorModule,
        NiopdcgatewayRequestTestResultModule,
        NiopdcgatewayTestResultModule,
        NiopdcgatewayRequestFilterElementModule,
        NiopdcgatewayChangeFilterElementModule,
        NiopdcgatewayRequestPlungingModule,
        NiopdcgatewayResponsePlungingModule,
        NiopdcgatewayRefuelCenterModule,
        NiopdcgatewayUserRefuelCenterModule,
        NiopdcgatewayPosModule,
        NiopdcgatewayParentBaseTestResultModule,
        NiopdcgatewayBaseTestResultModule,
        NiopdcgatewayAirportModule,
        NiopdcgatewayOilTankModule,
        NiopdcgatewayChangeRequestElementModule,
        NiopdcgatewayElementModule,
        NiopdcgatewayFilterModule,
        NiopdcgatewayLastChangeDateElementModule,
        NiopdcgatewayMetreModule,
        NiopdcgatewayMetreLogModule,
        NiopdcgatewayRequestElementModule,
        NiopdcgatewayTestResultMappingModule

        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayAoEntityModule {
}
