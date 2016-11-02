import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { AppToolbarService } from './shared/appToolbar.service';

@Component({
  selector: 'app',
  styles: [
    require('@angular/material/core/theming/prebuilt/indigo-pink.scss')
  ],
  template: `
  <md-toolbar color="primary">
    <button md-icon-button *ngIf="toolbarShowMenu">
      <md-icon>menu</md-icon>
    </button>
    <span>{{ toolbarTitle }}</span>
  </md-toolbar>
  <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit, OnDestroy {
  toolbarTitle: string = 'MyShows';
  toolbarShowMenu: boolean = false;
  loading: boolean;
  isLoggedIn: boolean;

  constructor(
    private router: Router,
    private appToolbarService: AppToolbarService
  ) {
    this.isLoggedIn = false;
    this.loading = true;
  }

  ngOnInit() {
    this.appToolbarService.titleChanged$.subscribe((title: string) => this.onToolbarTitleChanged(title));
    this.appToolbarService.showMenu$.subscribe((show: boolean) => this.onToolbarShowMenuChanged(show));
  }

  ngOnDestroy() {
    this.appToolbarService.titleChanged$.unsubscribe();
    this.appToolbarService.showMenu$.unsubscribe();
  }

  onToolbarTitleChanged(title: string) {
    this.toolbarTitle = title;
  }

  onToolbarShowMenuChanged(show: boolean) {
    console.log('show menu', show);
    this.toolbarShowMenu = show;
  }
}
