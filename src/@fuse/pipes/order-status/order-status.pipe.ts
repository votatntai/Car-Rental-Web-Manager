import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'orderStatus'
})
export class OrderStatusPipe implements PipeTransform {
    transform(value: string): string {
        switch (value) {
            case 'Canceled':
                return 'Đã hủy';
            case 'Pending':
                return 'Chờ xử lý';
            case 'ManagerConfirmed':
                return 'Quản lý đã xác nhận';
            case 'CarOwnerApproved':
                return 'Chủ xe đã phê duyệt';
            case 'ReceivedTheCar':
                return 'Đã nhận xe';
            case 'ArrivedAtPickUpPoint':
                return 'Đã đến điểm nhận xe';
            case 'ReceivedGuests':
                return 'Đã nhận khách';
            case 'Ongoing':
                return 'Đang thực hiện';
            case 'Paid':
                return 'Đã thanh toán';
            case 'ReturnedTheCar':
                return 'Đã trả xe';
            case 'Finished':
                return 'Hoàn thành';
            default:
                return value;
        }
    }
}
