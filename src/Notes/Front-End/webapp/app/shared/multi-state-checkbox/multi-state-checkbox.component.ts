import {
    Component, OnInit, Input, Output, ViewEncapsulation, EventEmitter,
    forwardRef, OnChanges, SimpleChange
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator} from '@angular/forms';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MultiStateCheckboxComponent),
    multi: true
};

export const CUSTOM_INPUT_CONTROL_VALIDATOR: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => MultiStateCheckboxComponent),
    multi: true
};

@Component({
    selector: 'app-multi-state-checkbox',
    templateUrl: 'multi-state-checkbox.component.html',
    styleUrls: ['multi-state-checkbox.component.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR,
        CUSTOM_INPUT_CONTROL_VALIDATOR]
})

export class MultiStateCheckboxComponent implements OnInit, OnChanges, ControlValueAccessor, Validator {
    _value: any;
    state: any;
    @Input() label;
    @Input() states = [{name: true, icon: 'fa-plus'}, {name: false, icon: 'fa-minus'}];
    @Input() defaultIcon = '';
    @Input() disabled = false;
    @Input() nullable = true;
    @Input() user = false;


    @Output() onChangeModel = new EventEmitter();

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        if (changes['states'] && this.states && changes['nullable'] && this.nullable) {
            if (this.value === undefined || this.value === null) {
                this.value = true;
            }
        }
    }

    changeState() {
        if (this.disabled) {
            return;
        }
        if (!this.state) {
            this.value = this.states[(this.user) ? 1 : 0].name;
        } else {
            const next = (this.states.findIndex(s => s.name === this.value) + 1) % this.states.length;
            if (next > 0 || !this.nullable) {
                this.value = this.states[next].name;
            } else {
                this.value = null;
            }
        }

        this.onChangeModel.emit(this.value);
    }

    ngOnInit(): void {
        // this.onChangeModel = new EventEmitter();
        if (!this._value) {
            this.value = this.states[0].name;
        }
    }

    set value(val: any) {
        this._value = val;
        if (this._value != null) {
            this.state = this.states.find(s => s.name === val);
        } else {
            this.state = null;
        }
        this.onChange(val);
        this.onTouched();
    }

    get value() {
        return this._value;
    }

    onChange: any = () => {
    }
    onTouched: any = () => {
    }

    writeValue(val: any) {
        this.value = val;
    }

    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }

    validate() {
        /*const err = {
         rangeError: {
         given: this.value,
         max: this.counterRangeMax || 10,
         min: this.counterRangeMin || 0
         }
         };*/

        return null;
    }
}
