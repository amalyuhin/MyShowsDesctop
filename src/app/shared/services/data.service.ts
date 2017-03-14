import * as _  from 'lodash';
import { EventEmitter } from '@angular/core';

import { ProfileEntity } from '../entities/profile.entity';

export class DataService {
  public profileChanged$: EventEmitter<ProfileEntity>;

  private profile: ProfileEntity;
  private shows: any;

  constructor() {
    this.profileChanged$ = new EventEmitter<ProfileEntity>();
    this.shows = [];
  }

  setProfile(profile: ProfileEntity) {
    this.profile = profile;
    this.profileChanged$.emit(profile);
  }

  getProfile(): ProfileEntity {
    return this.profile;
  }

  setShows(shows: any) {
    this.shows = shows;
  }

  getShows(): any {
      return this.shows;
  }

  findShow(id: number): any {
    return _.find(this.shows, { 'showId': id });
  }
}
