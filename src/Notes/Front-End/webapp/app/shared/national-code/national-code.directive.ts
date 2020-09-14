/**
 * Created by mehrabi-s on 02/05/2017.
 */
import {Directive, forwardRef, Input, OnChanges} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, Validator} from '@angular/forms';

@Directive({
    selector: '[national-code][formControlName],[national-code][formControl],[national-code][ngModel]',
    providers: [
        {provide: NG_VALIDATORS, useExisting: forwardRef(() => NationalCodeDirective), multi: true}
    ]
})
export class NationalCodeDirective implements Validator {
    @Input() isLegal: any;
    @Input() checkNationalCode: any;

    constructor() {
    }

    validate(c: AbstractControl): { [key: string]: any } {
        if (!this.checkNationalCode) { return null; }
        if (this.isLegal) {
            let validate = false;
            const code = c.value;
            if (code) {
                const L = code.length;
                if (L < 11 || parseInt(code, 10) === 0) {
                    validate = false;
                } else {
                    if (parseInt(code.substr(3, 6), 10) === 0) {
                        validate = false;
                    } else {
                        const last = parseInt(code.substr(10, 1), 10);
                        const d = parseInt(code.substr(9, 1), 10) + 2;
                        const z = [29, 27, 23, 19, 17];
                        let s = 0;
                        for (let i = 0; i < 10; i++) {
                            s += (d + parseInt(code.substr(i, 1), 10)) * z[i % 5];
                        }
                        s = s % 11;
                        if (s === 10) {
                            s = 0;
                        }
                        validate = (last === s);
                    }
                }
            }
            return !validate ? {
                nationalCode: !validate
            } : null;

        } else {
            const nationalCode = c.value;
            const pattern: RegExp = new RegExp(/^\d{10}$/, 'gi');
            const allDigitEqual =
                [
                    '0000000000',
                    '1111111111',
                    '2222222222',
                    '3333333333',
                    '4444444444',
                    '5555555555',
                    '6666666666',
                    '7777777777',
                    '8888888888',
                    '9999999999'
                ];

            if (!nationalCode || nationalCode === '') {
                return null;
            }

            if (
                (nationalCode.length && nationalCode.length !== 10) ||
                !pattern.test(nationalCode) ||
                allDigitEqual.filter(id => id === nationalCode).length > 0) {
                return {
                    nationalCode: true
                };
            }

            const chArray = Array.from(nationalCode);
            const num0 = +chArray[0] * 10;
            const num1 = +chArray[1] * 9;
            const num2 = +chArray[2] * 8;
            const num3 = +chArray[3] * 7;
            const num4 = +chArray[4] * 6;
            const num5 = +chArray[5] * 5;
            const num6 = +chArray[6] * 4;
            const num7 = +chArray[7] * 3;
            const num8 = +chArray[8] * 2;
            const num9 = +chArray[9];
            const sum = (((((((num0 + num1) + num2) + num3) + num4) + num5) + num6) + num7) + num8;
            const mod = sum % 11;

            const validate = (((mod < 2) && (num9 === mod)) || ((mod >= 2) && ((11 - mod) === num9)));
            return !validate ? {
                nationalCode: !validate
            } : null;
        }
    }
}
