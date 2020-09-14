import {Pipe} from '@angular/core';
import {type} from 'os';

@Pipe({name: 'sortBy'})

export class SortByPipe {

    transform(array: any[], args: string): any[] {
        if (array !== undefined) {
            array.sort((a: any, b: any) => {
                if (a[args] < b[args]) {
                    return -1;
                } else if (a[args] > b[args]) {
                    return 1;
                } else {
                    return 0;
                }
            });
        }
        return array;
    }
}
