import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Player } from '../../interfaces/player';
import { ApiService } from '../../services/api.service';

// Decorator @Components provides metadata about what component does
// and gow to inject it into rest of the applications
// Decorator @Components takes the configuration object as its only argument
@Component({
  //selector can be any valid CSS selector as the target,
  // usually it take name with - to avoid naming collisions
  selector: 'app-players', // Where to use the component in the dome

  // templateURL tells Angular which file use as a template for this component
  // Url points to a file
  // there can be also a template with straightforward HTML
  // template: '<h1>Hello World!</h1>',
  // this can't be combined with templateURL
  templateUrl: './players.component.html',

  //stylesUrls is an array of files defining CSS styles for the component
  //it can also use styles directly setting CSS
  // styles: ['.input-group { color: red; }']
  // this can be combined with styleUrls array
  styleUrls: ['./players.component.css']
})

// Here export of component class takes place
// Standard Typescript class used to inject dependencies, tap into lifecycle hooks
// and make data available in the template
// One can access public or protected class members from inside the HTML template
// This is how Angular makes UI dynamic and interactive
// Use word Component at the end of component name
export class PlayersComponent implements OnInit {
  // public property players$
  // it has an initial value of an observable, that returns undefined
  // it's a type of promise, but for data, that returns more than once
  // $ at the end of the name is a naming pattern for Observables
  public players$: Observable<Player[] | undefined> = of(undefined);

  // In constructor one initializes code and incject dependencies
  // Angular call constructor only once for each component, service or dependency
  // This code uses constructor to inject custom ApiService as a private class member
  constructor(
    //private class members make it easy to remove dead code later on
    private api: ApiService
    //body of the constructor is empty, because there is no code to initialize 
  ) { }

  // lifecycle hook ngOnInit
  public ngOnInit(): void {
    //method getAllPlayers on api service get players 
    // and assigns the return value to the players$ property of the component's class
    // service returns an observable of some kind -> $ at the end of the method name
    this.players$ = this.api.getAllPlayers$();
  }
  // public update method updates players$ property when we filter the list
  // by calling method getPlayersByName$ on the API servic
  public update(text: string) {
    this.players$ = this.api.getPlayersByName$(text);
  }
}
