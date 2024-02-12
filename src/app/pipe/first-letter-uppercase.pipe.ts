import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'firstLetterUpperCase'
})
export class FirstLetterUpperCasePipe implements PipeTransform {
  transform(word:string): string {
    if (!word) return word;
    return word[0].toUpperCase() + word.substring(1).toLowerCase();
  }
}