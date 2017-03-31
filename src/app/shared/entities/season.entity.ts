import { EpisodeEntity } from './episode.entity';

export class SeasonEntity {
  seasonNumber: number;
  showEpisodes: boolean;
  episodes: Array<EpisodeEntity>;

  constructor(seasonNumber: number, showEpisodes: boolean = true, entities: Array<EpisodeEntity> = []) {
    this.seasonNumber = seasonNumber;
    this.showEpisodes = showEpisodes;
    this.episodes = entities;
  }
}
