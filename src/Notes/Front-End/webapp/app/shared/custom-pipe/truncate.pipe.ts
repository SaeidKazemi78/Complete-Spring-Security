import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'truncate'
})

export class TruncatePipe implements PipeTransform {
    transform(value?: any, separator?: string, size?: number): any {
        if (value) {
            if (!separator) {
                separator = ' ';
            }
            if (!size) {
                if (separator.indexOf(',') > -1) {
                    size = 10;
                } else {
                    size = 20;
                }
            }
            const s1 = value.slice(0, size);
            const s2 = value.slice(size, value.length);

            if (s2 === '') {
                return s1;
            }

            const i = s2.indexOf(separator);
            let s3;
            if (i !== -1) {
                s3 = s2.slice(0, i);
            } else {
                s3 = s2;
            }
            const temp = s1 + s3;
            const arr = temp.split(separator);
            let result = '';
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].length > size) {
                    result += arr[i].slice(0, size) + separator + '...';
                    break;
                }
                result += arr[i] + separator;
                if (arr[i + 1]) {
                    if (result.length + arr[i + 1].length + 3 > size) {
                        result += '...';
                        break;
                    }
                }
            }
            return result;
        }
    }

}
