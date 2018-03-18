import { Pipe, PipeTransform } from '@angular/core';
import { Task } from './tasks.model';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.sort(this.compare);
  }

  compare(a: Task, b: Task) {
    if (Date.parse(a.createdDate) > Date.parse(b.createdDate))  { return -1 };
    if (Date.parse(a.createdDate) < Date.parse(b.createdDate)) { return 1 };
    return 0;
  }
}
