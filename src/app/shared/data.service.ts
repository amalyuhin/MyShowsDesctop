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
}
