/**
 * Created by mehrabi-s on 15/04/2017.
 */

import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'timeJalali'
})
export class TimeJalaliPipe implements PipeTransform {

    transform(value: any, ...args: any[]): any {
        if (value) {
            value = new Date(value);
            if (value) {
                return `${this.pad(value.getHours(), 2)}:${this.pad(value.getMinutes(), 2)}`;
            }
        }
        return '';

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

}
