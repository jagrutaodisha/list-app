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
    if (a.createdDate > b.createdDate)  { return -1 };
    if (a.createdDate < b.createdDate) { return 1 };
    return 0;
  }
}
