type ProfileStats = {
    remainingDays: number;
    remainingEpisodes: number;
    remainingHours: number;
    totalDays: number;
    totalEpisodes: number;
    totalHours: number;
    watchedDays: number;
    watchedEpisodes: number;
    watchedHours: number;
}

export class ProfileEntity {
  avatar: string;
  gender: string;
  isPro: boolean;
  login: string;
  wastedTime: number;
  followers: Array<ProfileEntity> = [];
  stats: ProfileStats;

  public static fromJSON(json: any): ProfileEntity {
    let instance = new ProfileEntity();
    let properties = ['avatar', 'gender', 'isPro', 'login', 'wastedTime', 'stats'];

    properties.forEach((prop: string) => {
      if (json.hasOwnProperty(prop) && typeof json[prop] !== 'function') {
        instance[prop] = json[prop];
      }
    });

    if (json.followers) {
      instance.followers = json.followers.map((followerData: any) => {
        return ProfileEntity.fromJSON(followerData);
      });
    }

    return instance;
  }
}
