import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'payment'
})
export class PaymentPipe implements PipeTransform {
    transform(value: boolean): string {
        return value ? 'Đã thanh toán' : 'Chưa thanh toán';
    }
}