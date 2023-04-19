import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'registrationStatus'
})
export class RegistrationStatussPipe implements PipeTransform {
    transform(value: boolean | string): string {
        if (value) {
            return 'Đã duyệt'
        }
        if (!value) {
            return 'Chưa duyệt'
        } else {
            return 'Đã từ chối'
        }
    }
}