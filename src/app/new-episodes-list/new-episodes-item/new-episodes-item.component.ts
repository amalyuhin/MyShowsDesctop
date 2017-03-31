import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { ShowEntity, EpisodeEntity, SeasonEntity, CommentEntity } from '../../shared/entities';

@Component({
  selector: 'new-episodes-item',
  templateUrl: './new-episodes-item.html'
})
export class NewEpisodesItemComponent implements OnInit {
  @Input()
  item: ShowEntity = null;

  seasons: Array<SeasonEntity> = [];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    if (this.item) {
      let currSeason: SeasonEntity = null;
      this.item.episodes.forEach((episode: EpisodeEntity) => {
          if (!currSeason || currSeason.seasonNumber !== episode.seasonNumber) {
            currSeason = new SeasonEntity(episode.seasonNumber, (currSeason === null), []);
            this.seasons.push(currSeason);
          }

          currSeason.episodes.push(episode);

          this.apiService
            .getEpisodeComments(episode.id)
            .subscribe((comments: Array<CommentEntity>) => {
              episode.comments = comments;

              console.log(episode);
            });
      });
    }
  }

  hasEpisodeComments(episode: EpisodeEntity) {
    return episode.comments && episode.comments.length;
  }

  toggleSeason(season: SeasonEntity) {
    season.showEpisodes = !season.showEpisodes;
  }

  isSeasonVisible(season: SeasonEntity): boolean {
      return season.showEpisodes;
  }

}
