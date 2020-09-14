import {LOCALE_ID, NgModule} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {NiopdcgatewaySharedLibsModule} from './shared-libs.module';
import {JhiAlertErrorComponent} from './alert/alert-error.component';
import {JhiAlertComponent} from './alert/alert.component';
import {InputMaskModule} from './input-mask/input-mask.module';
import {InputNumericModule} from './input-numeric/input-numeric.module';
import {InputFuelModule} from './input-fuel/input-fuel.module';
import {InputSearchAfterTypedModule} from './input-search/input-search.module';
import {NationalCodeModule} from './national-code/national-code.module';
import {AuthoritySelectorModule} from './authority-selector/authority-selector.module';
import {MultiStateCheckboxModule} from './multi-state-checkbox/multi-state-checkbox.module';
import {DateTimePickerJalaliModule} from './ng2-datetimepicker-jalali';
import {FindLanguageFromKeyPipe} from './language/find-language-from-key.pipe';
import {LocationSelectorModule} from './location-selector/location-selector.module';
import {RegionSelectorModule} from './region-selector/region-selector.module';
// import {LocationDisableSelectorModule} from './location-authority-selector/location-selector.module';
import {InputLocationSelectorModule} from './selectors/input-location-selector/input-location-selector.module';
import {InputRegionSelectorModule} from './selectors/input-region-selector/input-region-selector.module';
import {CustomPipeModule} from './custom-pipe/custom-pipe.module';
import {EqualsInputValidationModule} from './equals-input-validation/equals-input-validation.module';
import {AlertConverterModule} from './alert-converter/alert-converter.module';
import {CodemirrorModule} from '@ctrl/ngx-codemirror';
import {JhiAlertSuccessComponent} from 'app/shared/alert/alert-success.component';
import {SearchHistoryModule} from 'app/shared/hotkey/search-history/search-history.module';
import {VersionShowDialogComponent, VersionShowPopupComponent} from 'app/entities/version';

@NgModule({
    imports: [
        NiopdcgatewaySharedLibsModule,
        LocationSelectorModule,
        RegionSelectorModule,
        CustomPipeModule,
        DateTimePickerJalaliModule,
        InputMaskModule,
        NationalCodeModule,
        EqualsInputValidationModule,
        InputNumericModule,
        InputFuelModule,
        InputSearchAfterTypedModule,
        MultiStateCheckboxModule,
        AuthoritySelectorModule,
        InputLocationSelectorModule,
        InputRegionSelectorModule,
        AlertConverterModule,
        CodemirrorModule,
        SearchHistoryModule
        // LocationDisableSelectorModule
    ],
    declarations: [
        FindLanguageFromKeyPipe,
        JhiAlertComponent,
        JhiAlertSuccessComponent,
        JhiAlertErrorComponent,
        VersionShowDialogComponent,
        VersionShowPopupComponent
    ],
    entryComponents:[
        VersionShowDialogComponent
    ],
    providers: [
        FindLanguageFromKeyPipe,

        Title,
        {
            provide: LOCALE_ID,
            useValue: 'fa'
        },
    ],
    exports: [
        NiopdcgatewaySharedLibsModule,
        LocationSelectorModule,
        RegionSelectorModule,
        FindLanguageFromKeyPipe,
        JhiAlertComponent,
        JhiAlertSuccessComponent,
        JhiAlertErrorComponent,
        CustomPipeModule,
        DateTimePickerJalaliModule,
        InputMaskModule,
        NationalCodeModule,
        InputNumericModule,
        InputFuelModule,
        EqualsInputValidationModule,
        InputSearchAfterTypedModule,
        MultiStateCheckboxModule,
        AuthoritySelectorModule,
        InputLocationSelectorModule,
        InputRegionSelectorModule,
        AlertConverterModule,
        CodemirrorModule,
        SearchHistoryModule

        // LocationDisableSelectorModule
    ]
})
export class NiopdcgatewaySharedCommonModule {
    constructor() {
    }
}
