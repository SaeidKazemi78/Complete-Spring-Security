import {Pipe} from '@angular/core';
import {type} from 'os';

@Pipe({name: 'separator'})

export class SeparatorPipe {

    transform(number: number | string, args?: string): string {
        if (number !== undefined) {
            const rx =  /(\d+)(\d{3})/;
            return String(number).replace(/^\d+/,w => {
                let res = w;
                while (rx.test(res)) {
                    res = res.replace(rx, '$1٬$2');
                }
                return res;
            });
        }
        return '';
    }
}
