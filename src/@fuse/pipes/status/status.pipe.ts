import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'accountStatus'
})
export class AccountStatusPipe implements PipeTransform {
    transform(value: boolean): string {
        return value ? 'Đang hoạt động' : 'Đã bị chặn';
    }
}