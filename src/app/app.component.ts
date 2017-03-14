import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { AppToolbarService } from './shared/services/appToolbar.service';
import { DataService } from './shared/services/data.service';
import { ProfileEntity } from './shared/entities/profile.entity';

@Component({
  selector: 'app',
  styles: [
    require('@angular/material/core/theming/prebuilt/indigo-pink.scss')
  ],
  template: `
  <md-sidenav-container fullscreen>
    <md-toolbar color="primary" layout="column" *ngIf="showToolbar">
      <button md-icon-button *ngIf="showMenuButton" (click)="sidenav.toggle()">
        <md-icon>menu</md-icon>
      </button>
      <span>{{ toolbarTitle }}</span>
    </md-toolbar>
    <md-sidenav style="width:60%" class="md-sidenav-left" #sidenav mode="over">
      <div *ngIf="profile">
        <md-nav-list>
          <md-list-item>
            <img md-list-avatar src="{{ profile.avatar }}" width="40" />
            <h3 md-line>{{ profile.login }}</h3>
          </md-list-item>
          <md-list-item *ngIf="profile.stats">
            <div>Просмотрено эпизодов: {{ profile.stats.watchedEpisodes }}</div>
            <div>Потрачено часов: {{ profile.stats.watchedHours }}</div>
            <div>Потрачено дней: {{ profile.stats.watchedDays }}</div>
          </md-list-item>
        </md-nav-list>
      </div>
    </md-sidenav>
    <router-outlet></router-outlet>
  </md-sidenav-container>
  `,
})
export class AppComponent implements OnInit, OnDestroy {
  toolbarTitle: string = 'MyShows';
  showToolbar: boolean = false;
  showMenuButton: boolean = false;


  loading: boolean;
  isLoggedIn: boolean;
  profile: ProfileEntity;

  constructor(
    private router: Router,
    private appToolbarService: AppToolbarService,
    private dataService: DataService,
  ) {
    this.isLoggedIn = false;
    this.loading = true;
  }

  ngOnInit() {
    this.appToolbarService.titleChanged$.subscribe((title: string) => this.onToolbarTitleChanged(title));
    this.appToolbarService.showToolbar$.subscribe((show: boolean) => this.onToolbarShowToolbarChanged(show));
    this.appToolbarService.showMenuButton$.subscribe((show: boolean) => this.onToolbarShowMenuButtonChanged(show));
    this.dataService.profileChanged$.subscribe((profile: ProfileEntity) => this.profile = profile);
  }

  ngOnDestroy() {
    this.appToolbarService.titleChanged$.unsubscribe();
    this.appToolbarService.showMenuButton$.unsubscribe();
  }

  onToolbarTitleChanged(title: string) {
    this.toolbarTitle = title;
  }

  onToolbarShowToolbarChanged(show: boolean) {
    this.showToolbar = show;
  }

  onToolbarShowMenuButtonChanged(show: boolean) {
    this.showMenuButton = show;
  }
}
