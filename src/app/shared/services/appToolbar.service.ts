import { EventEmitter } from '@angular/core';

export class AppToolbarService {
  public titleChanged$: EventEmitter<string>;
  public showToolbar$: EventEmitter<boolean>;
  public showMenuButton$: EventEmitter<boolean>;

  constructor() {
    this.titleChanged$ = new EventEmitter<string>();
    this.showToolbar$ = new EventEmitter<boolean>();
    this.showMenuButton$ = new EventEmitter<boolean>();
  }

  setTitle(title: string) {
    this.titleChanged$.emit(title);
  }

  showToolbar(show: boolean) {
    this.showToolbar$.emit(show);
  }

  showMenuButton(show: boolean) {
    this.showMenuButton$.emit(show);
  }
}
