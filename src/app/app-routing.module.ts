import { NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';
import { PreloadingService } from './services/preloading.service';

//Array of objects representing one route definition
const routes: Routes = [
  //Order of the routes matters, because Angular takes the first matching route
  //Most specific routes at the start of the array
  //Least specific routes at the end
  {
    //path: string telling Angular what to look for in an URL
    //path is always relative to the parent route,
    //if there's not parent, path is relative to the <base href="/"> in index.html file
    //path can contain dynamic route parameter path: 'profile/:id'

    //dynamic route parameter needs to start with :stringName
    // "id" is a token
    path: 'profile/:id',

    //loadChildren and loadComponent (for standalone components) is pointing Angular which module to use,
    //when navigating to that path

    loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent),

    //title property sets the name displayed in the tab, and in bookmark
    //title can be a static string or a function
    //Function allows for access to dependency injection and access to the details of the current URL
    //allowing for dynamic title base on some calculation

    //id (token) can be accessed by any component, directive or service using activated route and 
    //activated route snapshot classes that come with Angular
    //Snapshot represents a specific moment in time
    //standard Activated Route represents the data, that can change in the future.
    //Snapshot allos to set dynamic title depending on the currently opened page
    //Snapsot has a paramMap property, and get method can be used to access the value of the ID token
    //get method returns the value of that token from URL, which is then used to generate template literal

    title: (route: ActivatedRouteSnapshot) => `Gem Finder | Profile for ${route.paramMap.get('id')}`
  },
  {
    path: 'players',

    //value for loadChildren and loadComponent must be a callback function that returns a dynamic import
    //dynamic import is special a function like expressions available in all modern browsers
    //allowing to load ES6 modules in an asynchronous way
    //This lets Angular to lazy load routes
    loadChildren: () => import('./pages/players/players.module').then(m => m.PlayersModule),
    title: 'Gem Finder | All Players',

    //Data property allows to assing custom key: value pairs to any route, if needed
    //This data can be used in other parts of your app by accessing the property through the Route object
    //or the Activate Route class

    data: { preload: true }
  },
  {
    path: 'leaderboards',
    loadChildren: () => import('./pages/leaderboards/leaderboards.module').then(m => m.LeaderboardsModule),
    title: 'Gem Finder | Leaderboards'
  },
  {
    path: 'messages',
    loadComponent: () => import('./pages/messages/messages.component').then(m => m.MessagesComponent),
    data: { preload: true }
  },
  //path: '' is a special path, pointing to root URL of the project, usually the same as base HREF
  //pathMatch property is choosing which strategy to use when checking URLs 
  {
    path: '',
    redirectTo: `/players`,
    pathMatch: 'full',
  },
  //path can contain 'wild cards' path: '**' - accept any value Angular sees in that position in the URL
  //Wild card are used to define "catch all" routes, to always display something, if the path dont' match other routes,
  //using redirect property
  //Notation /players redirects to the absolute route, relative to the base HREF
  //Notation players redirects to relative parent route, if any
  {
    path: '**',
    redirectTo: '/players'
  }
];

//To use routes available in the app one needs to add Router Module to the list of imports and exports
//in the @NgModule decorator in the main routing file (app-routing.module.ts)

@NgModule({
  imports: [
    //import the module and pass route definitions and bootstrap the service.
    //RouterModule has two static methods:
    //RouterModule.forRoot tell Angular that this is the main instance for the route definitions
    //This method is called once in the project and takes routes as its first argument. 

    //preloadingStrategy property is in optional configuration object as a second argument
    //value for preloadingStrategy is a class that has a public method on it, that returns an observable
    //default value for preloadingStrategy is NoPreloading, which means all modules are lazy loaded.
    //PreloadAllModules - is a built in clas
    //Custom service, like here, allows to choose, which modules can be preloaded.
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadingService })

    //RouterModule.forChild(routes) - a subset of routes for a specific module
    //leaderboards-routing.module.ts 
    //const routes: Routes = [{ path: '', component: LeaderboardsComponent }]
    //@NgModule({
    // imports: [RouterModule.forChild(routes)],
    // exports: [RouterModule]
    // })
    // export class LeaderboardsRoutingModule { }
  ],
  // export the same module to make it available in the other parts of the app.
  exports: [RouterModule]
})
export class AppRoutingModule { }
