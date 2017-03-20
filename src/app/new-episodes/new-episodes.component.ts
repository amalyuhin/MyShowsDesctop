import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ShowEntity } from '../shared/entities/show.entity';
import { EpisodeEntity } from '../shared/entities/episode.entity';
import { ApiService } from '../shared/services/api.service';
import { DataService } from '../shared/services/data.service';
import { AppToolbarService } from '../shared/services/appToolbar.service';

@Component({
  templateUrl: './new-episodes.html'
})
export class NewEpisodesComponent implements OnInit {
  shows: ShowEntity[];
  showEpisodes: any = {};

  constructor(
    private apiService: ApiService,
    private dataService: DataService,
    private appToolbarService: AppToolbarService
  ) { }

  ngOnInit() {
    this.appToolbarService.setTitle('MyShows');
    this.appToolbarService.showToolbar(true);
    this.appToolbarService.showMenuButton(true);

    Observable.forkJoin(
      this.apiService.getProfileShows(),
      this.apiService.getUnwatchedEpisodes()
    )
    .subscribe((res) => {
      let shows = res[0];
      let episodes = res[1];

      this.dataService.setShows(shows);

      episodes.forEach((episode) => {
        let episodeShow = shows.filter((show) => {
          return show.id === episode.showId;
        });

        if (episodeShow.length) {
          episodeShow[0].addEpisode(episode);
        }
      });

      this.shows = shows.filter((show) => {
         if (show.episodes && show.episodes.length > 0) {
           this.showEpisodes[show.id] = true;
           return true;
         }

         return false;
      });
    });
  }

  toggleShowEpisodes(show: ShowEntity) {
    if (!this.showEpisodes[show.id]) {
      this.showEpisodes[show.id] = true;
    } else {
        this.showEpisodes[show.id] = !this.showEpisodes[show.id];
    }
  }

  isShowEpisodesVisible(show: ShowEntity): boolean {
    return !!this.showEpisodes[show.id];
  }
}
