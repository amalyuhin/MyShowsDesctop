import * as _  from 'lodash';

export class DataService {
  private shows: any;

  constructor() {
    this.shows = [];
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
