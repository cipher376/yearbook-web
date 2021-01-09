import { User } from './user';

export interface FollowInterface {
    id?: any;
    leaderId?: any;
    followerId?: any;
    dateFollowed?: Date;
    lastModified?: Date;
    isFollowing?: boolean;
    leaderModelName: string;
    leader?: User;
    follower?: User;
}

export class Follow implements FollowInterface {
    id: any;
    leaderId: any;
    followerId: any;
    dateFollowed: Date;
    lastModified?: Date;
    isFollowing?: boolean;
    leaderModelName: string;
    leader: User;
    follower: User;
    constructor(data?: FollowInterface) {
        Object.assign(this, data);
    }
}