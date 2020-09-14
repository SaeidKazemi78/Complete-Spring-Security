import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostListener,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges, ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator} from '@angular/forms';
import {NgbCalendar, NgbCalendarPersian, NgbDate, NgbDatepickerConfig, NgbDatepickerI18n} from '@ng-bootstrap/ng-bootstrap';

import {NgbDatepickerI18nPersian} from 'app/shared/ng2-datetimepicker-jalali/NgbDatepickerI18nPersian';
import {fromGregorian, toGregorian} from 'app/shared/ng2-datetimepicker-jalali/jalali';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatetimepickerComponent),
    multi: true
};

export const CUSTOM_INPUT_CONTROL_VALIDATOR: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => DatetimepickerComponent),
    multi: true
};

@Component({
    selector: 'ng2-datetimepicker',
    templateUrl: './datetimepicker.component.html',
    styleUrls: ['./datetimepicker.component.css'],
    providers: [
        NgbDatepickerConfig,
        {provide: NgbCalendar, useClass: NgbCalendarPersian},
        {provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nPersian},
        CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR,
        CUSTOM_INPUT_CONTROL_VALIDATOR
    ]
    , encapsulation: ViewEncapsulation.None
})
export class DatetimepickerComponent implements AfterViewInit, OnInit, OnChanges, ControlValueAccessor, Validator {

    @Output() OnPersianFormat = new EventEmitter();
    @Output() onChangeDateTime = new EventEmitter();
    @Input('disableTime') disableTime = false;
    @Input() maxDateTime;
    @Input() minDateTime;
    @Input() displayMonths = 1;
    @Input() liveEmit = false;
    @Input() date;
    @Input() disableDate = false;

    @Input() disabled: boolean;
    @Input() required = false;

    @Input() overlayVisible: boolean;
    @Input() dir: 'ltr' | 'rtl';
    @Input() rtlActive = false;

    @Input() time;

    @ViewChild('dp')
    datePicker;

    mask = '0000/00/00 00:00';

    _dateTimeFormat = '';
    _date;
    _time: { hour: number, minute: number, second: number } = {
        hour: 0,
        minute: 0,
        second: 0
    };
    _value: Date;
    _lastValue;

    _panelClick: boolean;

    maxDate: NgbDate;
    minDate: NgbDate;
    minTime: {
        hour: number,
        minute: number,
        second: number
    };
    maxTime: {
        hour: number,
        minute: number,
        second: number
    };

    disableToday: boolean = false;

    constructor(private elementRef: ElementRef,
                private config: NgbDatepickerConfig) {
        const date = fromGregorian(new Date());
        config.minDate = {year: 1290, month: 1, day: 1};
        config.maxDate = {year: date.year + 50, month: 12, day: 30};

    }

    ngAfterViewInit() {
        this.applyMask();

    }

    ngOnInit() {
        this._panelClick = false;

        if (!(this.dir === 'rtl' || this.dir === 'ltr')) {
            let parent = this.elementRef.nativeElement.parentElement;
            while (parent && !(this.dir === 'rtl' || this.dir === 'ltr')) {
                this.dir = parent.dir;
                parent = parent.parentElement;
            }
            if (!(this.dir === 'rtl' || this.dir === 'ltr')) {
                this.dir = 'rtl';
            }
        }
        if (this.required !== false) {
            this.required = true;
        }

        if ((this.minDateTime && new Date().getTime() < this.minDateTime.getTime())
            || (this.maxDateTime && new Date().getTime() > this.maxDateTime.getTime())) {
            this.disableToday = true;
        } else {
            this.disableToday = false;
        }

    }

    applyMask() {
        this.mask = (this.disableDate ? '' : '0000/00/00 00:00') + (this.disableTime ? '' : (this.disableDate ? '00:00' : ' 00:00'));
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.canChange();
        if (changes.minDateTime) {
            if (this.minDateTime) {
                this.minDate = fromGregorian(this.minDateTime);
                this.minTime = {hour: this.minDateTime.getHours(), minute: this.minDateTime.getMinutes(), second: this.minDateTime.getSeconds()};
                this.config.minDate = this.minDate;
            }
        }
        if (changes.maxDateTime) {
            if (this.maxDateTime) {
                this.maxDate = fromGregorian(this.maxDateTime);
                this.maxTime = {hour: this.maxDateTime.getHours(), minute: this.maxDateTime.getMinutes(), second: this.maxDateTime.getSeconds()};
                this.config.maxDate = this.maxDate;
            }
        }
        if (changes.time) {
            const times = this.time.split(/:/);
            if (times.length > 3 ||
                (times.length > 0 && +times[0] > 23 || +times[0] < 0) ||
                (times.length > 1 && +times[1] > 59 || +times[1] < 0) ||
                (times.length > 2 && +times[2] > 59 || +times[2] < 0)) {
                this.time = null;
            }
            this._time = {
                hour: times.length > 0 ? +times[0] : 0,
                minute: times.length > 1 ? +times[1] : 0,
                second: times.length > 2 ? +times[2] : 0
            };
        }

        if (changes.disableDate || changes.disableTime) {
            // this.applyMask();
        }

    }

    changedTime() {
        if (this.disableDate) {
            this._date = fromGregorian(this.date ? this.date : new Date());
        }
        if (this._time) {
            this.canChange();
        }
    }

    changedDate() {
        if (this._date) {
            this.canChange();
        }
        // if (this.disableTime) {
        this.hide();
        // }
    }

    selectToday() {
        if (this.disableToday) {
            return;
        }
        this.datePicker.navigateTo();
        const date = new Date();
        const now: NgbDate = fromGregorian(date);
        this._date = {year: now.year, month: now.month, day: now.day};
        if (!this.disableTime) {
            this._time = {hour: date.getHours(), minute: date.getMinutes(), second: date.getSeconds()};
        }

        if (this.disableTime) {
            date.setHours(0, 0, 0, 0);
        }
        this.writeValue(date);
        this.onChange(this.getValue());
        this.close();
    }

    clear() {
        this._date = this.date ? fromGregorian(this.date) : null;
        this._dateTimeFormat = '';
        this.canChange();

    }

    clear2() {
        this._dateTimeFormat = '';
        this._time = {
            hour: 0,
            minute: 0,
            second: 0
        };
        this.writeValue(null);
        this.onChange(this.getValue());
    }

    close() {
        this.hide();

    }

    getValue(): Date {
        this.applyTextInput();
        if (this._date) {
            const date: Date = toGregorian(this._date);

            console.log('this.time', this.time);
            let times = null;
            if (this.time) {
                times = this.time.split(/:/);
                if (times.length > 3 ||
                    (times.length > 0 && +times[0] > 23 || +times[0] < 0) ||
                    (times.length > 1 && +times[1] > 59 || +times[1] < 0) ||
                    (times.length > 2 && +times[2] > 59 || +times[2] < 0)) {
                    this.time = null;
                }
            }

            if (this.time && this.disableTime) {
                this._time = {
                    hour: times.length > 0 ? +times[0] : 0,
                    minute: times.length > 1 ? +times[1] : 0,
                    second: times.length > 2 ? +times[2] : 0
                };
            }

            if (this.disableTime && !this._time) {
                this._time = {hour: 0, minute: 0, second: 0};
            }

            if (this._time) {
                date.setHours(this._time.hour);
                date.setMinutes(this._time.minute);
                date.setSeconds(this._time.second);

                this.OnPersianFormat.emit(this._date.year + '/' + this._date.month + '/' + this._date.day +
                    ((this.disableTime) ? '' : (this.disableDate ? '' : ' ') + this._time.hour + ':' + this._time.minute));
                return date;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    applyTextInput() {
        if (this.disableDate) {
            this._date = fromGregorian(this.date ? this.date : new Date());
        }
        if (this._date) {
            this._dateTimeFormat = this.disableDate ?
                '' :
                `${this.pad(this._date.year, 4)}/${this.pad(this._date.month, 2)}/${this.pad(this._date.day, 2)}`;

            if (this._time && !this.disableTime) {
                this._dateTimeFormat += (this.disableDate ? '' : ' ') + `${this.pad(this._time.hour, 2)}:${this.pad(this._time.minute, 2)}`;
            }
        }
    }

    pad(str: number | any, max) {
        str = str.toString();
        let i: number;
        let strR = '';
        for (i = 0; i < max - str.length; i++) {
            strR += '0';
        }

        return strR + str;
    }

    inputBlur() {

        if (this._dateTimeFormat) {
            const datetime: string[] = this._dateTimeFormat.replace(/\s/gi, ' ').split(' ');
            if (((this.disableDate || this.disableTime) && datetime.length === 1) || datetime.length === 2) {

                const date: string[] = (this.disableDate) ? null :
                    datetime[0].split('/');

                if (this.disableDate || (date.length === 3 &&
                    +date[0] && +date[0] > 0 && +date[0] < 9999 &&
                    +date[1] && +date[1] > 0 && +date[1] <= 12 &&
                    +date[2] && +date[2] > 0 && +date[2] <= 31)
                ) {
                    if (this.disableTime) {
                        this._time = {hour: 0, minute: 0, second: 0};
                        if (this.disableDate) {
                            this._date = fromGregorian(this.date ? this.date : new Date());
                        } else {
                            this._date = new NgbDate(+date[0], +date[1], +date[2]);
                        }
                    } else if (this.disableDate || datetime.length > 1) {
                        const time: string[] = (this.disableDate ? datetime[0] : datetime[1]).split(':');
                        if (time.length === 2 &&
                            +time[0] != null && +time[0] > -1 && +time[0] < 24 &&
                            +time[1] != null && +time[1] > -1 && +time[1] < 60
                        ) {
                            this._time = {hour: +time[0], minute: +time[1], second: 0};
                            if (this.disableDate) {
                                this._date = fromGregorian(this.date ? this.date : new Date());
                            } else {
                                this._date = new NgbDate(+date[0], +date[1], +date[2]);
                            }
                        } else {
                            this._time = null;
                        }
                    }
                } else {
                    this._date = null;
                }
            } else {
                this._date = null;
            }
        } else {
            this._date = null;
        }
        this.onChange(this.getValue());
    }

    getValidDate() {
        if (this.disableDate) {
            return true;
        }

        if (this._date && (this.minDateTime || this.maxDateTime)) {
            if (this.minDate &&
                (this.minDate.year > this._date.year ||
                    (this.minDate.year === this._date.year && this.minDate.month > this._date.month) ||
                    (this.minDate.year === this._date.year && this.minDate.month === this._date.month &&
                        this.minDate.day > this._date.day))) {
                return false;
            } else if (this.maxDate &&
                (this.maxDate.year < this._date.year ||
                    (this.maxDate.year === this._date.year && this.maxDate.month < this._date.month) ||
                    (this.maxDate.year === this._date.year && this.maxDate.month === this._date.month &&
                        this.maxDate.day < this._date.day))) {
                return false;
            }
        }
        return true;
    }

    getValidTime() {
        if (this.disableTime === true) {
            return true;
        }

        if (this.getValidDate() && this._time && this._date && (this.minDateTime || this.maxDateTime)) {

            if (this.minDateTime &&
                this.minDate &&
                this.minTime) {

                if (this.minDate.year === this._date.year &&
                    this.minDate.month === this._date.month &&
                    this.minDate.day === this._date.day) {

                    if (this.minTime.hour > this._time.hour || (
                        this.minTime.hour === this._time.hour &&
                        this.minTime.minute >= this._time.minute
                    )) {
                        return false;
                    }
                }
            }

            if (this.maxDateTime && this.maxDate && this.maxTime) {
                if (this.maxDate.year === this._date.year &&
                    this.maxDate.month === this._date.month &&
                    this.maxDate.day === this._date.day) {

                    if (this.maxTime.hour < this._time.hour || (
                        this.maxTime.hour === this._time.hour &&
                        this.maxTime.minute <= this._time.minute)) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    canChange() {
        const value = this.getValue();
        if ((!this._lastValue && value) || this._lastValue && value && this._lastValue.toISOString() !== value.toISOString()) {
            this._lastValue = value;
            this.onChange(value);
            if (this.liveEmit) {
                this.onChangeDateTime.emit(this.getValue());
            }

        }
    }

    onChange: any = () => {
    };
    onTouched: any = () => {
    };

    writeValue(val: any) {
        if (!val) {
            this.clear();

        } else if (val !== this.getValue()) {
            this._value = new Date(val);
            if (this._value && val) {
                if (this.disableDate) {
                    this._date = fromGregorian(this.date ? this.date : new Date());
                } else {
                    this._date = fromGregorian(this._value);
                }
                this._time = {hour: this._value.getHours(), minute: this._value.getMinutes(), second: 0};
            }
            this.applyTextInput();
        }
    }

    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }

    validate() {
        const err = {
            rangeError: {
                dateTime: this.getValue(),
                max: this.maxDateTime,
                min: this.maxDateTime
            }
        };

        // todo check it
        return null; // (this.required && this._dateTimeFormat) || !this.getValidTime() || !this.getValidDate() ? null : err;
    }

    onMouseClick() {
        if (this.disabled) {
            return;
        }

        if (!this._panelClick) {
            if (this.overlayVisible) {
                this.hide();
            } else {
                this.show();
                if (this._date && this.datePicker) {
                    this.datePicker.navigateTo({year: this._date.year, month: this._date.month});
                }
            }
        }
    }

    show() {
        this.overlayVisible = true;
    }

    hide() {
        if (!this.liveEmit && this.overlayVisible) {
            this.onChangeDateTime.emit(this.getValue());
        }
        this.overlayVisible = false;
    }

    @HostListener('document:click', ['$event'])
    handleClick(event) {
        let clickedComponent = event.target;
        let inside = false;
        do {
            if (clickedComponent === this.elementRef.nativeElement) {
                inside = true;
            }
            clickedComponent = clickedComponent.parentNode;
        } while (clickedComponent);
        if (!inside) {
            if (this.disableTime || (!this.disableTime && !this._panelClick)) {
                this.hide();
            }
        }
        this._panelClick = false;
    }
}
