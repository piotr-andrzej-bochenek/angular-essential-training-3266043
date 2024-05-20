import { HttpClient } from '@angular/common/http';
import { Injectable, computed, effect, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Message } from '../interfaces/message';
import { AnalyticsService } from './analytics.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  //Signal function creates new reactive value
  //Signal function takes one required argument - the initial value
  //Value returned by signal function assigned to public property unread
  public unread = signal<Message[]>([]);

  //Computed function creates new reactive value based on existing signals
  //Value returned by the computed function is assigned to the public property count
  //Computed function takes as an argument a callback function, 
  //that returns a value that uses data from one or more signals
  public count = computed(() => {
    //To get the value in signal, one needs to call the property like a function
    //Calling the signal gives access to all methods available to the underlying type
    //length methos is available due to data type in signal to be an array.
    return this.unread().length;
  });

  constructor(
    private analytics: AnalyticsService,
    private http: HttpClient,
  ) {
    effect(() => {
      this.analytics.track('MESSAGE_COUNT', this.count().toString());
    });

    this.http
      .get<Message[]>('/assets/mocks/messages.json')
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: items => this.unread.set(items)
      });
  }

  public delete(selected: Message) {
    this.unread.update(items => {
      return items.filter((item) => item.id !== selected.id);
    });
  }
}
