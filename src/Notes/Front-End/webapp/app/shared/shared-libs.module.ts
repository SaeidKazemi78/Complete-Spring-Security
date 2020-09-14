import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgJhipsterModule} from 'ng-jhipster';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {CookieModule} from 'ngx-cookie';
import {ExcelModule, GridModule, PDFModule} from '@progress/kendo-angular-grid';
import 'quill/quill';

import {
    AccordionModule,
    BlockUIModule,
    BreadcrumbModule,
    ButtonModule,
    CheckboxModule,
    ColorPickerModule,
    DataTableModule,
    DropdownModule,
    EditorModule,
    FileUploadModule,
    InputMaskModule,
    InputSwitchModule,
    MenubarModule,
    MultiSelectModule,
    OverlayPanelModule,
    SelectButtonModule,
    SharedModule,
    SplitButtonModule,
    StepsModule,
    TabViewModule,
    ToggleButtonModule
} from 'primeng/primeng';
import {TableModule} from 'primeng/table';
import {ButtonsModule} from '@progress/kendo-angular-buttons';
import {DropDownsModule} from '@progress/kendo-angular-dropdowns';
import {PanelBarModule} from '@progress/kendo-angular-layout';
import {QueryBuilderModule} from 'angular2-query-builder';
import {ListboxModule} from 'primeng/listbox';
import {HotkeyModule} from 'angular2-hotkeys';
import {GrowlModule} from 'primeng/growl';
import {ToastModule} from 'primeng/toast';
import {
    DxBulletModule, DxChartModule,
    DxDataGridModule,
    DxNumberBoxModule,
    DxPivotGridModule,
    DxTemplateModule
} from "devextreme-angular";
import {IconPickerModule} from "ngx-icon-picker";
import {BotDetectCaptchaModule} from "angular-captcha";

@NgModule({
    imports: [
        OverlayPanelModule,
        BotDetectCaptchaModule,
        NgbModule,
        EditorModule,
        NgJhipsterModule.forRoot({
            // set below to true to make alerts look like toast
            alertAsToast: false,
            i18nEnabled: true,
            defaultI18nLang: 'fa'
        }),
        InfiniteScrollModule,
        DataTableModule,
        SharedModule,
        MultiSelectModule,
        ButtonModule,
        CheckboxModule,
        BreadcrumbModule,
        InputSwitchModule,
        ToggleButtonModule,
        TableModule,
        SelectButtonModule,
        ColorPickerModule,
        MenubarModule,
        InfiniteScrollModule,
        StepsModule,
        SplitButtonModule,
        BlockUIModule,
        FileUploadModule,
        QueryBuilderModule,
        DropdownModule,
        ListboxModule,
        ButtonsModule,
        DropDownsModule,
        InputMaskModule,
        PanelBarModule,
        GridModule,
        PDFModule,
        ExcelModule,
        CookieModule.forRoot(),
        HotkeyModule.forRoot(),
        GrowlModule,
        ToastModule,
        AccordionModule,
        TabViewModule,
        DxDataGridModule,
        DxTemplateModule,
        DxBulletModule,
        DxPivotGridModule,
        DxNumberBoxModule,
        DxChartModule,
        DxPivotGridModule,
        IconPickerModule
    ],
    exports: [
        BotDetectCaptchaModule,
        OverlayPanelModule,
        FormsModule,
        EditorModule,
        CommonModule,
        NgbModule,
        NgJhipsterModule,
        InfiniteScrollModule,
        DataTableModule,
        SharedModule,
        MultiSelectModule,
        ButtonModule,
        CheckboxModule,
        BreadcrumbModule,
        InputSwitchModule,
        ToggleButtonModule,
        TableModule,
        SelectButtonModule,
        ColorPickerModule,
        MenubarModule,
        StepsModule,
        FileUploadModule,
        QueryBuilderModule,
        DropdownModule,
        ListboxModule,
        SplitButtonModule,
        ButtonsModule,
        DropDownsModule,
        InputMaskModule,
        PanelBarModule,
        GridModule,
        PDFModule,
        ExcelModule,
        HotkeyModule,
        GrowlModule,
        ToastModule,
        AccordionModule,
        TabViewModule,
        DxDataGridModule,
        DxTemplateModule,
        DxBulletModule,
        DxPivotGridModule,
        DxNumberBoxModule,
        DxChartModule,
        DxPivotGridModule,
        IconPickerModule
    ]
})
export class NiopdcgatewaySharedLibsModule {
}
