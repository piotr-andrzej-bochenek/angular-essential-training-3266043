import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, of, switchMap } from 'rxjs';
import { OnlineStatusDirective } from '../../directives/online-status.directive';
import { Player } from '../../interfaces/player';
import { JoinPipe } from '../../pipes/join/join.pipe';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [CommonModule, JoinPipe, OnlineStatusDirective]
})
export class ProfileComponent implements OnInit {
  public player$: Observable<Player | undefined> = of(undefined);

//Dependency injection
// private keyword makes sure that these dependencies are for internal use only, not outside the class (component)
// naming of unique name to reference the dependency should be short and clear (api for ApiService,
// route for Angular's ActivatedRoute service)
  constructor(
    private api: ApiService, //api variable of type ApiService
    private route: ActivatedRoute //route variable of type ActivatedRoute
    //Angular checks the injector for an instance of the ApiService and returns the instance for those dependencies.
    //Depending on definition and declaration, Angular can create only one instance (singleton) of the dependency for all parts
    //of the application.
    //Singleton allows for all parts of the application to have access to the same data inside the dependency.
    //It's recommended to use singletons when possible.
    //Caching data or sharing data might be a good candidate for a singleton.
  ) { }

  public ngOnInit(): void {
    this.player$ = this.route.paramMap.pipe(
      map(params => params.get('id') ?? ''),
      switchMap(id => this.api.getPlayerById$(id))
    );
  }

}
