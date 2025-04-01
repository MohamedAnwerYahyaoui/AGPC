import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayFromNumber'
})
export class ArrayFromNumberPipe implements PipeTransform {
  transform(value: number): number[] {
    return Array.from({ length: value }, (_, i) => i + 1);
  }
}