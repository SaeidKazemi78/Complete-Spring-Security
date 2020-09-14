import {Injectable} from '@angular/core';

@Injectable()
export class SearchHistoryService {
    set(componentName: string, value: string) {
        let now = new Date();
        now.setMinutes(now.getMinutes() + 5);
        now = new Date(now);
        const obj: SearchHistoryModel = {value, expireDate: now};
        localStorage.setItem(componentName, JSON.stringify(obj));
    }

    setObject(componentName: string, value: any) {
        let now = new Date();
        now.setMinutes(now.getMinutes() + 5);
        now = new Date(now);
        const obj: SearchHistoryModel = {value, expireDate: now};
        localStorage.setItem(componentName, JSON.stringify(obj));
    }


    get(componentName: string): SearchHistoryModel | any {
        const valueInString = localStorage.getItem(componentName);
        if (!valueInString) {
            return null;
        } else {
            const result: SearchHistoryModel = JSON.parse(valueInString);
            const date = new Date();
            console.log('n' + date.getTime());
            console.log(new Date(result.expireDate).getTime());
            if (new Date(result.expireDate) < date) {
                localStorage.removeItem(componentName);
                return null;
            } else {
                this.set(componentName, result.value);
                return result;
            }
        }
    }

    clear(componentName) {
        localStorage.removeItem(componentName);
    }
}

export class SearchHistoryModel {
    constructor(
        public value?: string,
        public expireDate?: Date
    ) {
    }
}
