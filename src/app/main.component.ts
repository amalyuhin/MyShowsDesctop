import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ApiService } from './shared/services/api.service';
import { DataService } from './shared/services/data.service';
import { AppToolbarService } from './shared/services/appToolbar.service';
import { ProfileEntity } from './shared/entities/profile.entity';
import { ShowEntity } from './shared/entities/show.entity';

@Component({
  template: `
    <p *ngIf="!shows">Checking authentication ...</p>
    <md-list *ngIf="shows">
      <md-list-item *ngFor="let show of shows">
        <img md-list-avatar src="{{ show.image }}" width="40" />
        <h3 md-line>{{ show.title }}</h3>
        <p md-line>
          <span class="demo-2">{{ show.ruTitle ? show.ruTitle : '' }}</span>
        </p>
      </md-list-item>
    </md-list>
  `
})
export class MainComponent implements OnInit {
  profile: ProfileEntity;
  shows: ShowEntity[];

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
        (shows: ShowEntity[]) => {
          this.appToolbarService.setTitle('MyShows');
          this.appToolbarService.showMenu(true);

          this.dataService.setShows(shows);
          this.shows = shows;

          this.apiService
            .getProfile()
            .subscribe((profile: ProfileEntity) => {
              this.appToolbarService.setTitle('MyShows');
              this.appToolbarService.showMenu(true);
              //this.profile = profile;
              this.dataService.setProfile(profile);
            });
        },
        (error: any) => {
          console.error(error);
          this.router.navigate(['/login']);
        }
      );
  }
}
