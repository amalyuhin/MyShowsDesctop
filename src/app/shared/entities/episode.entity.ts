import * as moment from 'moment';
import { ShowEntity, CommentEntity } from './';

export class EpisodeEntity {
  id: number;
  showId: number;
  title: string;
  image: string;
  episodeNumber: number;
  seasonNumber: number;
  airDate: moment.Moment;
  tvrageLink: string;
  comments: Array<CommentEntity>;

  public static fromJSON(json: any): EpisodeEntity {
    let instance = new EpisodeEntity();
    let properties = Object.keys(json);

    properties.forEach((prop: string) => {
      if (json.hasOwnProperty(prop) && typeof json[prop] !== 'function') {
        if (prop === 'airDate') {
          instance[prop] = moment(json[prop], 'DD.MM.YYYY');
        } else {
          instance[prop] = json[prop];
        }
      }
    });

    if (json.episodeId) {
      instance.id = json.episodeId;
    }

    return instance;
  }
}
