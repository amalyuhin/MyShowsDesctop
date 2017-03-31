import * as moment from 'moment';
import { ProfileEntity } from './profile.entity';

export class CommentEntity {
  id: number;
  showId: number;
  episodeId: number;
  userId: number;
  user: ProfileEntity;
  parentCommentId: number;
  text: string;
  image: string;
  createdAt: moment.Moment;
  statusId: number;
  rating: number;

  isNew: boolean;
  isMyPlus: boolean;
  isMyMinus: boolean;
  isMyComment: boolean;
  isBad: boolean;
  isEditable: boolean;
  isDeleted: boolean;


  public static fromJSON(json: any): CommentEntity {
    const propertiesMap: any = CommentEntity.getApiPropertiesMap();
    let instance = new CommentEntity();

    Object.keys(propertiesMap)
      .forEach((prop: any) => {
        if (json.hasOwnProperty(prop)) {
          let instanceProp = propertiesMap[prop];
          switch (instanceProp) {
            case 'createdAt':
              instance[instanceProp] = moment(json[prop]);
              break;
            case 'user':
              instance[instanceProp] = ProfileEntity.fromJSON(json[prop]);
              break;
            default:
              instance[instanceProp] = json[prop];
          }
        }
      });

    return instance;
  }

  private static getApiPropertiesMap(): any {
      return {
        userCommentId: 'id',
        showId: 'showId',
        episodeId: 'episodeId',
        siteUserId: 'userId',
        siteUser: 'user',
        parentCommentId: 'parentCommentId',
        comment: 'text',
        image: 'image',
        createdAt: 'createdAt',
        statusId: 'statusId',
        rating: 'rating',
        isNew: 'isNew',
        isMyPlus: 'isMyPlus',
        isMyMinus: 'isMyMinus',
        isMyComment: 'isMyComment',
        isBad: 'isBad',
        isEditable: 'isEditable',
        isDeleted: 'isDeleted'
      };
  }

}
