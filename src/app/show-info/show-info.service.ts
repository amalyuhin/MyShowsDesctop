import { BaseApiService } from '../shared/services/base-api.service';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { HttpService } from '../shared/services/http.service';
import { ShowEntity, EpisodeEntity } from '../shared/entities';

@Injectable()
export class ShowInfoService extends BaseApiService {
  constructor(protected http: HttpService) {
    super(http)
  }

  getInfo(showId: number): Observable<ShowEntity> {
    return Observable
      .forkJoin(
        this.get(`shows/${showId}`).map((res: Response) => res.json()),
        this.get(`profile/shows/${showId}/`).map((res: Response) => res.json())
      )
      .map((data: any[]) => {
          let show: ShowEntity = ShowEntity.fromJSON(data[0]);
          let watchedEpisodes = data[1];

          show.episodes.forEach((episode: EpisodeEntity) => {
            if (watchedEpisodes[episode.id]) {
              episode.isViewed = true;
            }
          });

          return show;
      });
  }
}
