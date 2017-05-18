import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';

import { ShowEntity, SeasonEntity, EpisodeEntity } from '../shared/entities';
import { AppToolbarService } from '../shared/services';
import { ShowInfoService } from './show-info.service';

@Component({
  selector: 'show-info',
  templateUrl: './show-info.html',
  styles: [
    require('./show-info.scss')
  ],
  providers: [ShowInfoService]
})
export class ShowInfoComponent implements OnInit, OnDestroy {
  showId: number;
  showInfo: ShowEntity;
  showSeasons: SeasonEntity[] = [];

  constructor(
    private route: ActivatedRoute,
    private appToolbarService: AppToolbarService,
    private showInfoService: ShowInfoService
  ) {}

  ngOnInit(): void {
    this.appToolbarService.showToolbar(true);
    this.appToolbarService.showMenuButton(true);

    this.route.params
      .subscribe((params: Params) => {
        this.showId = +params['showId'];
        this.showInfoService
          .getInfo(this.showId)
          .subscribe((showInfo: ShowEntity) => {
            this.showInfo = showInfo;
            this.appToolbarService.setTitle(showInfo.ruTitle || showInfo.title);
            this.initSeasons();
          });
      });
  }

  initSeasons(): void {
    let currentSeason: SeasonEntity = null;
    this.showInfo.episodes
      .sort((a: EpisodeEntity, b: EpisodeEntity) => {
        return b.airDate.toDate().getTime() - a.airDate.toDate().getTime();
      })
      .forEach((episode: EpisodeEntity) => {
        if (!currentSeason || currentSeason.seasonNumber !== episode.seasonNumber) {
          currentSeason = new SeasonEntity(episode.seasonNumber, true, []);
          this.showSeasons.push(currentSeason);
        }

        currentSeason.episodes.push(episode);
      });

    this.showSeasons.sort((a: SeasonEntity, b: SeasonEntity) => {
      return b.seasonNumber - a.seasonNumber;
    });
  }

  ngOnDestroy(): void {

  }
}
