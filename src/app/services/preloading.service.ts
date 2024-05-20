import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreloadingService implements PreloadingStrategy {

  //Angular will look for preload method to check which modules need preloading in the background
  //Route definition is passes as a first argument,
  //Second argument is a callback function that returns an observable
  //This is how Angular is told to preload the route  
  public preload(route: Route, fn: () => Observable<any>): Observable<any> {
    //basic conditional statement to choose the route to preload
    //if route has route.data object and if that object have a value 'preload', then it's preloaded.
    //If yes, callback function fn() is called, if not, it creates a new observable with a value of null.
    return (route.data && route.data['preload']) ? fn() : of(null);
  }

}
