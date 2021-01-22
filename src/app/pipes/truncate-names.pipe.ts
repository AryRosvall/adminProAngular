import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateName'
})
export class TruncateNamesPipe implements PipeTransform {

  transform(name: string): unknown {

    let nameArr = []
    nameArr = name.split(' ')
    return (nameArr.length >= 2) ? `${nameArr[0]} ${nameArr[1]}` : nameArr[0]
  }

}
