import { AfterContentInit, Directive, ElementRef, Input } from '@angular/core';

//Directives are always Typescript classes
//@Directive decorator takes a configuration object as its only argument.
@Directive({
  //The selector property tell Angular which CSS selector to use to identify the directive in templates
  // [appOnlineStatus] is an attribute CSS selector
  selector: '[appOnlineStatus]',
  // providers property is an array of all the code that we want to make available for the directive
  // through dependency injection, empty when not needed.
  providers: [],
  // the default option for standalone is false, when standalone components are used,
  // standalone in the directive must be set to true
  standalone: true
})

// Here export of the directive class takes place
// Use word Directive at the end of directive name name
// The following pipe includes AfterContentInit interface from Angular core package - this is a lifecycle hook
// This allows for use of ngAfterContentInit() method 
export class OnlineStatusDirective implements AfterContentInit {
  // Public property appOnlineStatus is declared here
  // @Input() decorator informs Angular, that the value of this property is dynamic
  // and that it comes from a data (property) binding in the parent component
  @Input() public appOnlineStatus: boolean | undefined;
  // Directive selector and its property share the same name - this is the simplest way to work with imputs
  // Pointing the class property to a alias in the HTML template, where the directive is used, is also possible.

  //Constructor is called only once
  constructor(
    //Inject ElementRef class and assign it to private property element
    //ElementRef<HTMLAnchorElement> class comes from Angular core package
    //and gives access to DOM element that uses this directive
    private element: ElementRef<HTMLAnchorElement>
  ) { }
  // This lifecycle hook guarantees, that Angular initialized all the content of the page
  // before the code of this directive gets executed
  public ngAfterContentInit(): void {
    //This method checks if the appOnlineStatus is true
    if (this.appOnlineStatus === true) {
      //if this is true, it adds a custom HTML
      //instance of the class ElementRef is used to access underlying native HTML element
      //and append (add) the custom HTML to the existing DOM.
      this.element.nativeElement.innerHTML += '<i class="bi bi-lightning-fill"></i>';
    //Angular makes new instance of the directive for each player on the list, so the element ref is also unique.
    }
  }

}
