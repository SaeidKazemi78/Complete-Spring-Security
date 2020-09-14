import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CommonModule, DatePipe} from '@angular/common';
import {DateTimeJalaliPipe} from './datetime-jalali.pipe';
import {DatetimepickerComponent} from './datetimepicker.component';
import {InputMaskDirective} from './input-mask.directive';
import {DateJalaliPipe} from 'app/shared/ng2-datetimepicker-jalali/date-jalali.pipe';
import {TimeJalaliPipe} from 'app/shared/ng2-datetimepicker-jalali/time-jalali.pipe';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
@NgModule({
  declarations: [
    DatetimepickerComponent,
    DateTimeJalaliPipe,
      DateJalaliPipe,
      TimeJalaliPipe,
    InputMaskDirective
  ],
  imports: [
      CommonModule,
    FormsModule,
    NgbModule
  ],
  exports: [
    DatetimepickerComponent,
    DateTimeJalaliPipe,
      DateJalaliPipe,
      TimeJalaliPipe
  ],
  providers: [DatePipe]
})
export class DateTimePickerJalaliModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
