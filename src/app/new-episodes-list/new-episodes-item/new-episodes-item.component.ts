import { Component, Input, OnInit } from '@angular/core';
import { ShowEntity } from '../../shared/entities/show.entity';
import { EpisodeEntity } from '../../shared/entities/episode.entity';

class Season {
  seasonNumber: number;
  showEpisodes: boolean;
  episodes: Array<EpisodeEntity>;

  constructor(seasonNumber: number, showEpisodes: boolean, entities: Array<EpisodeEntity>) {
    this.seasonNumber = seasonNumber;
    this.showEpisodes = showEpisodes;
    this.episodes = entities;
  }
}

@Component({
  selector: 'new-episodes-item',
  templateUrl: './new-episodes-item.html'
})
export class NewEpisodesItemComponent implements OnInit {
  @Input()
  item: ShowEntity = null;

  seasons: Array<Season> = [];

  ngOnInit() {
    if (this.item) {
      let currSeason: Season = null;
      this.item.episodes.forEach((episode: EpisodeEntity) => {
          if (!currSeason || currSeason.seasonNumber !== episode.seasonNumber) {
            currSeason = new Season(episode.seasonNumber, (currSeason === null), []);
            this.seasons.push(currSeason);
          }

          currSeason.episodes.push(episode);
      });
    }
  }

  toggleSeason(season: Season) {
    season.showEpisodes = !season.showEpisodes;
  }

  isSeasonVisible(season: Season): boolean {
      return season.showEpisodes;
  }

}
