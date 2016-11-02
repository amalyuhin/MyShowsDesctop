import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from './shared/api.service';
import { DataService } from './shared/data.service';
import { AppToolbarService } from './shared/appToolbar.service';

@Component({
  template: `
    <p *ngIf="!shows">Checking authentication ...</p>
    <md-list *ngIf="shows">
      <md-list-item *ngFor="let show of shows">
        <img md-list-avatar src="{{ show.image }}" width="48" />
        <div md-line>
          <h3>{{ show.title }}</h3>
          <p>{{ show.ruTitle ? show.ruTitle : '' }}</p>
        </div>
      </md-list-item>
    </md-list>
  `
})
export class MainComponent implements OnInit {
  shows: any;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private dataService: DataService,
    private appToolbarService: AppToolbarService
  ) {
    this.shows = null;
  }

  ngOnInit() {
    this.apiService
      .getProfileShows()
      .subscribe(
        (shows: any) => {
          this.appToolbarService.setTitle('MyShows');
          this.appToolbarService.showMenu(true);

          this.dataService.setShows(shows);
          this.shows = shows;
        },
        (error: any) => {
          console.error(error);
          this.router.navigate(['/login']);
        }
      )
  }
}
