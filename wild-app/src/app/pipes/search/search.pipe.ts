import { Pipe, PipeTransform } from '@angular/core';

/**
 *	Pipe for filtering list with specified text.
 */
@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, property:string, text:string): any {

  	if(value == null || text == null)
  		return value;

  	let filter = text.toLocaleLowerCase(); 

  	return filter ? value.filter(val => val[property].toLocaleLowerCase().indexOf(filter) != -1) : value; 
  }
}
