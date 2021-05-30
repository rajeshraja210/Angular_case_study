import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'cents'
})
export class CentsPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value / 100;
  }

}