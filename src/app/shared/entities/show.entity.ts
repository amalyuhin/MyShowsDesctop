import * as moment from 'moment';

export class ShowEntity {
  id: number;
  title: string;
  ruTitle: string;
  description: string;
  country: string;
  year: number;
  started: Date;
  ended: Date;
  image: string;
  rating: number;
  runtime: number;
  imdbId: number;
  kinopoiskId: number;
  tvrageId: number;
  showStatus: string;
  watchStatus: string;
  totalEpisodes: number;
  watchedEpisodes: number;
  voted: number;
  watching: number;

  public static fromJSON(json: any) : ShowEntity {
    if (!json.id && !json.showId) {
      throw new TypeError('Invalid property id');
    }

    let instance = new ShowEntity();
    let properties = Object.keys(json);

    properties.forEach((prop: string) => {
      if (json.hasOwnProperty(prop) && typeof json[prop] !== 'function') {
        if (prop === 'starded' || prop === 'ended') {
          instance[prop] = moment(json[prop], 'MMM/DD/YYYY').toDate();
        } else {
          instance[prop] = json[prop];
        }
      }
    });

    if (json.showId) {
      instance.id = json.showId;
    }

    return instance;
  }
}
