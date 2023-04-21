import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'machineStatus'
})
export class MachineStatusPipe implements PipeTransform {
    transform(value: string): string {
        switch (value) {
            case 'Idle':
                return 'Đang sãn sàng';
            case 'Ongoing':
                return 'Đã được thuê';
            case 'Blocked':
                return 'Đang bảo dưỡng';
            case 'InOrder':
                return 'Đang được đặt';
            default:
                return value;
        }
    }
}
