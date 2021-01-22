import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateEmail'
})
export class EmailPipe implements PipeTransform {

  transform(email: string): string {

    let truncatedEmail = ''
    if (email.includes('@')) {
      truncatedEmail = email.slice(0, email.indexOf('@'))
    }
    return (truncatedEmail.length > 20) ? `${truncatedEmail}...` : truncatedEmail;
  }

}
