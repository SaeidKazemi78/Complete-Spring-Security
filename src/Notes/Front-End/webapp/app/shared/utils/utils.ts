export function pad(str: number | any, max) {
    str = str.toString();
    let i: number;
    let strR = '';
    for (i = 0; i < max - str.length; i++) {
        strR += '0';
    }

    return strR + str;
}

export function dateRangeValidation(startDate: any, finishDate: any, days: number, mode: 'startDate' | 'finishDate') {
    const differenceInTime = finishDate.getTime() - startDate.getTime();
    const differenceInDay = differenceInTime / (1000 * 3600 * 24);
    if (differenceInDay > days) {
        if (mode === 'startDate') {
            finishDate = new Date(startDate);
            finishDate.setDate(finishDate.getDate() + days);
            return finishDate;
        } else {
            startDate = new Date(finishDate);
            startDate.setDate(startDate.getDate() - days);
            return startDate;
        }
    }
    return null

}
