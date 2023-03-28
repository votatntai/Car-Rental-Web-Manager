import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'timeSpan'
})
export class TimeSpanPipe implements PipeTransform {

    transform(value: string): string {
        const datePipe = new DatePipe('en-US');
        const time = new Date(`1970-01-01T${value}`);
        return datePipe.transform(time, 'HH:mm');
    }

}
