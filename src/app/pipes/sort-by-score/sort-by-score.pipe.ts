import { Pipe, PipeTransform } from '@angular/core';
import { Player } from '../../interfaces/player';

//Pipes are always typescript classes
//@Pipe decorator tell Angular, what this pipe should do and how to inject it elsewhere
//@Pipe decorator takes configuration object as it's only argument.
@Pipe({
  //Camelcase for name of pipe, no hyphens- or underscores_ (reserved for components and directives)
  name: 'sortByScore',
  //If the pipe is pure or not, optional as this is true for default
  pure: true,
  // default is false, only if standalone components are used, enable.
  standalone: false
})
// Use word Pipe at the end of Pipe name
// The following pipe includes PipeTransform core package from Angular - helps with autocompletion and type safety
export class SortByScorePipe implements PipeTransform {
// Angulars looks for transform method in each pipe, error if it's missing
// Transform method takes at least one argument
// First argument is the value from the template one wants to change
// Here list of players to be sorted is the only argument (of type Playe[])
  transform(players: Player[]): Player[] {
    //Return from the pipe is mandatory, even if null or undefined
    return players.sort((a, b) => b.score - a.score);
  }

}
