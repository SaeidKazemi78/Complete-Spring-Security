/**
 * Created by mehrabi-s on 02/05/2017.
 */
import {Directive, forwardRef, Input, OnChanges, SimpleChanges} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, Validator} from '@angular/forms';

@Directive({
    selector: '[equals-input-validation][formControlName],[equals-input-validation][formControl],[equals-input-validation][ngModel]',
    providers: [
        {provide: NG_VALIDATORS, useExisting: forwardRef(() => EqualsInputValidationDirective), multi: true}
    ]
})
export class EqualsInputValidationDirective implements Validator, OnChanges {
    @Input('equals') equals: any;
    private _onChange: () => void;

    constructor() {
    }

    validate(c: AbstractControl): { [key: string]: any } | null {
        const equals = this.equals === c.value;
        return equals ? null : {'equals': {value: c.value}};
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.equals && !changes.equals.isFirstChange()) {
            if (this._onChange) { this._onChange(); }
        }
    }

    registerOnValidatorChange(fn: () => void): void { this._onChange = fn; }

}
