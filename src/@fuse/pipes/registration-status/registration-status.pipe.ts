import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'registrationStatus'
})
export class RegistrationStatussPipe implements PipeTransform {
    transform(value: boolean): string {
        return value ? 'Đã duyệt' : 'Chưa duyệt';
    }
}