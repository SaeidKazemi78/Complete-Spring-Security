/**
 * Created by mehrabi-s on 15/04/2017.
 */
import {Pipe, PipeTransform} from '@angular/core';
import {fromGregorian} from 'app/shared/ng2-datetimepicker-jalali/jalali';
import {pad} from 'app/shared/utils/utils';

@Pipe({
    name: 'dateTimeJalali'
})
export class DateTimeJalaliPipe implements PipeTransform {
    transform(value: any,showSecond?: boolean , ...args: any[]): any {
        if (value) {
            value = new Date(value);
            if (value) {
                const da = fromGregorian(value);
                let dateStr =  `${da.year}/${pad(da.month, 2)}/${pad(da.day, 2)} ${pad(value.getHours(), 2)}:${pad(value.getMinutes(), 2)}`;
               if(showSecond){
                   dateStr += `:${pad(value.getSeconds(), 2)}`;
               }
                return  dateStr;
            }
        }
        return '';
    }
}
