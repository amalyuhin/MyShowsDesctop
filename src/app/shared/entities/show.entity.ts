import * as moment from 'moment';
import { EpisodeEntity } from './episode.entity';

export class ShowEntity {
  id: number;
  title: string;
  ruTitle: string;
  description: string;
  country: string;
  year: number;
  started: moment.Moment;
  ended: moment.Moment;
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
  episodes: Array<EpisodeEntity>;

  public addEpisode(episode: EpisodeEntity) {
    if (!this.episodes) {
      this.episodes = [];
    }

    this.episodes.push(episode);
  }

  public static fromJSON(json: any) : ShowEntity {
    if (!json.id && !json.showId) {
      throw new TypeError('Invalid property id');
    }

    let instance = new ShowEntity();
    let properties = Object.keys(json);

    properties.forEach((prop: string) => {
      if (json.hasOwnProperty(prop) && typeof json[prop] !== 'function' && prop !== 'episodes') {
        if (prop === 'starded' || prop === 'ended') {
          instance[prop] = moment(json[prop], 'MMM/DD/YYYY');
        } else {
          instance[prop] = json[prop];
        }
      }
    });

    if (json.showId) {
      instance.id = json.showId;
    }

    if (json.episodes) {
      let episodesKeys = Object.keys(json.episodes);
      episodesKeys.forEach((key: any) => {
        instance.addEpisode(EpisodeEntity.fromJSON(json.episodes[key]));
      });
    }

    return instance;
  }
}
