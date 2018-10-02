import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ start.Date | duration:end.Date }}
 *   formats to: 1024
*/
@Pipe({name: 'duration'})
export class DurationPipe implements PipeTransform {
  transform(startTime: Date, endTime: Date) {
		let eventStartTime = new Date(startTime);
      	let eventEndTime = new Date(endTime);
     	let diffDays = eventEndTime.valueOf() - eventStartTime.valueOf();
     	let diff = Math.ceil(diffDays / (1000 * 3600 * 24 * 365)); 
        return Math.abs(diff);
  }
}