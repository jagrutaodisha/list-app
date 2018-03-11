import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchList'
})
export class SearchListPipe implements PipeTransform {

  transform(value: any, input: any, args?: any) {
    if (input) {
      input = input.toLowerCase();
      return value.filter(function (el: any) {
        return el.name.toLowerCase().indexOf(input) > -1;
      })
    }
    return value;
  }

}
