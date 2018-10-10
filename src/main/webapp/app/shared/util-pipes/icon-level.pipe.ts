import { Pipe, PipeTransform } from '@angular/core';
/*
 * Usage:
 *   start.Date.value | duration:end.Date.value
 * Example:
 *   {{ start.Date | duration:end.Date }}
 *   formats to: 1024
*/
@Pipe({name: 'iconLevel'})
export class IconLevelPipe implements PipeTransform {
  transform(rating: number) {
    const maxRating = 5;
    const invertRating = maxRating - rating;
    let exportingHtml = '';
   for (const i of Array(rating)) {
exportingHtml += '<span class="fa fa-square fa-lg"></span>';
}
   for (const i of Array(invertRating)) {
exportingHtml += '<span class="fa fa-square-o fa-lg"></span>';
   }
    return exportingHtml;
  }
}
