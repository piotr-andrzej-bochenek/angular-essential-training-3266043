//Earlier import of HttpClientModul in app.module.ts is required to access HttpClient class in other parts of app.
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map } from 'rxjs';
import { Player } from '../interfaces/player';

//Services are always Typescript classes
//@Injectable decorator takes the configuration object as its only argument
//@Injectable decorator tell Angular to regiser the service class in the Injector
@Injectable({
  //providedIn property tell Angular which parts of this application can have access to this service
  //by default this property has null value, so in order to use it, it must be added to each module
  //'root' value creates one instance of this service for all parts of this application
  providedIn: 'root'
})
// User word Service at the end of service name
export class ApiService {

  //Constructor allow s to inject depedencies and initialize code.
  constructor(
    //Inject private class member HttpClient service from Angular
    private http: HttpClient
  ) { }
  // getAllPlayers$ method is how we communicate with database to get info about all players
  // $ at the end method name is a naming pattern hinting at use of Observables
  // Observables are a sort of promise, but for data that returns more than once.
  // Method which is observable hints that data need to be unwrapped
  public getAllPlayers$() {
    // Angular's HttpClient instance is used to make a get request to the database for our data
    // The http instance is referenced here and it provides access to all REST methods
    // used with working with database
    // Get method takes two arguments - one is a string representing URL to our data (any valid URL, including local as here)
    // Second argument is an object of optional requests settings, not used here
    // <Player[]> sets the return type of this get method. This helps with autocompletion and type safety.
    // Lack of return value setting will deliver generic object back.
    // .pipe(delay(1000)) - pipe method built-in to work this observables, it is a method chained to the get function
    // pipe method allows to transform data inside an observable by composing functions together
    // The output of each function becomes the input of the next
    // This code pipes response from get method to a delay method, imported from rxjs library in imports section
    // Pipe methods are used to map and filter data, as well as catch errors.
    // Here this delay simulates response delayed by web lag, to see loading templates in the app.
    return this.http.get<Player[]>('/assets/mocks/players.json').pipe(delay(1000));
  }

  //Here the output of getAllPlayers$ method is piped through the rxjs map function to find players by id

  public getPlayerById$(id: string) {
    return this.getAllPlayers$().pipe(
      // Map take a callback function, that gives an access to the data inside Observable
      // map(players => players.someMethod()) - this is an observable
      // players.find(player => player.id === id)) - iterate over each item in the list of players
      // and return the first player, that matches the Id
      map(players => players.find(player => player.id === id))
    );
  }

  //Here the output of getAllPlayers$ method is piped through the rxjs map function to find players by id
  public getPlayersByName$(text: string) {
    return this.getAllPlayers$().pipe(
      // players.filter(player => player.name.toLowerCase().includes(text.toLowerCase())))
      // iterate over each item in the list of players and return the player matching by name (.includes(text))
      map(players => players.filter(player => player.name.toLowerCase().includes(text.toLowerCase())))
    );
  }
}
