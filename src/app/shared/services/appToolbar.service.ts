import { EventEmitter } from '@angular/core';

export class AppToolbarService {
  public titleChanged$: EventEmitter<string>;
  public showMenu$: EventEmitter<boolean>;

  constructor() {
    this.titleChanged$ = new EventEmitter<string>();
    this.showMenu$ = new EventEmitter<boolean>();
  }

  setTitle(title: string) {
    console.log('emit');
    this.titleChanged$.emit(title);
  }

  showMenu(show: boolean) {
    this.showMenu$.emit(show);
  }
}
