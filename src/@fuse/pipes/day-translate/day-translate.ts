import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dayTranslate'
})
export class DayTranslatePipe implements PipeTransform {
    transform(value: string): string {
        switch (value) {
            case 'Monday':
                return 'Thứ 2';
            case 'Tuesday':
                return 'Thứ 3';
            case 'Wednesday':
                return 'Thứ 4';
            case 'Thursday':
                return 'Thứ 5';
            case 'Friday':
                return 'Thứ 6';
            case 'Saturday':
                return 'Thứ 7';
            case 'Sunday':
                return 'Chủ Nhật';
            default:
                return value;
        }
    }
}
