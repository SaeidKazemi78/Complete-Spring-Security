/**
 * Created by motakefi-p on 02/01/2018.
 */

import {Pipe, PipeTransform} from '@angular/core';
import {fromGregorian} from 'app/shared/ng2-datetimepicker-jalali/jalali';
import {pad} from 'app/shared/utils/utils';
@Pipe({
    name: 'dateJalali'
})
export class DateJalaliPipe implements PipeTransform {

    transform(value: any, ...args: any[]): any {
        if (value) {
            value = new Date(value);
            if (value) {
                const da = fromGregorian(value);
                return  `${da.year}/${pad(da.month, 2)}/${pad(da.day, 2)}`;
            }
        }
        return '';
    }


}
