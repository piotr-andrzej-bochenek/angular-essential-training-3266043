import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Angular modules are always Typescript classes
//Decorator @NgModule declares class as a module
//@NgModule takes the configuration object as its only argument

@NgModule({
// declarations property is an array of all the components, directives and pipes, that belong to this module
  declarations: [
    AppComponent
  ],
// imports property is an array of all external modules that will be available in this module's template
  imports: [
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    HttpClientModule
  ],
// exports property is an array of all the code that this module will make available for other modules
  exports: [],
// providers property is an array of services -> all external code that will be available in this module's template through dependency injection
  providers: [
    // Providers can be declared with shorthand notation (name only):
    // ApiService,
    // or provide for tokens and useClass for what to inject
    // { provide: ApiService, useClass ApiService }
  ],
// bootstrap property is an array of entry components, usually a root component AppComponent.
// Bootstrapping process creates the components listed in the array and inserts it into DOM
// This is the only place where bootstrap property should be declared.
  bootstrap: [AppComponent]
})
// export class AppModule, usually empty, just to tell Angular which component to launch at app launch
// App module exported here is imported to main.ts file
export class AppModule { }
