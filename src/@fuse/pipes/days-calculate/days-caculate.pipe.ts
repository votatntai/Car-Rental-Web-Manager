import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calculateDays'
})
export class CalculateDaysPipe implements PipeTransform {
  transform(a: string, b: string): number {
    let dateA = new Date(a);
    let dateB = new Date(b);

    let span = Math.abs(dateB.getTime() - dateA.getTime());
    let days = Math.floor(span / (1000 * 60 * 60 * 24));

    return days;
  }
}