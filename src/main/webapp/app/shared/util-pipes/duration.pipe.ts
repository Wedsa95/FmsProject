import { Pipe, PipeTransform } from '@angular/core';
/*
 * Usage:
 *   start.Date.value | duration:end.Date.value
 * Example:
 *   {{ start.Date | duration:end.Date }}
 *   formats to: 1024
*/
@Pipe({name: 'duration'})
export class DurationPipe implements PipeTransform {
  transform(startTime: Date, endTime: Date) {
  const eventStartTime = new Date(startTime);
    const eventEndTime = new Date(endTime);
    const diffDays = eventEndTime.valueOf() - eventStartTime.valueOf();
    const diff = Math.ceil(diffDays / (1000 * 3600 * 24 * 365));
    return Math.abs(diff);
  }
}
