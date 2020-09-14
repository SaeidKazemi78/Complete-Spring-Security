import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'plaqueFormat'
})
export class PlaqueFormatPipe implements PipeTransform {
    transform(value: string) {
       if (value && (new RegExp('\\d{2}[الف]\\d{5}').test(value) || new RegExp('\\d{2}[آ-ی]\\d{5}').test(value))) {

           const temp = value.replace(/\s/g, '');
           if ( temp.length === 8 ) {
               return temp.substr(0, 2) + ' ' + temp.substr(2, 1) + ' ' + temp.substr(3, 3) + ' ' + 'ایران' + ' ' + temp.substr(6, 2);
           } else if ((temp.length === 10 && new RegExp('\\d{2}[الف]\\d{5}').test(temp))) {
               return temp.substr(0, 2) + ' ' + temp.substr(2, 3) + ' ' + temp.substr(5, 3) + ' ' + 'ایران' + ' ' + temp.substr(8, 2);
           }

           return value;
       }

       return value;

    }
}
