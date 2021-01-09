import { Photo, Video, Audio } from './my-media';
import { School } from './school';
import { User } from './user';


export interface PostConfig {
    isEvent: boolean;
    isAnnouncement: boolean;
    isPrivate: boolean;
}

export interface PostInterface {
    id: number;
    title?: string;
    message: string;
    dateCreated?: Date;
    userId: number;
    schoolId?: number;
    user?: User;
    school?: School;
    shareCount?: number;


}

export class Post {

    id: number;
    title?: string;
    message: string;
    dateCreated?: Date;
    userId: number;
    schoolId?: number;
    shareCount?: number;


    photos?: Photo[] = [];
    audios?: Audio[] = [];
    videos?: Video[] = [];
    documents?: Document[] = [];
    user?: User;
    school?: School;


    postConfig?: PostConfig;

    /**
     *
     */
    constructor(
        private data?: PostInterface
    ) {
        this.id = data?.id;
        this.title = data?.title;
        this.message = data?.message;
        this.dateCreated = data?.dateCreated;
        this.userId = data?.userId;
        this.schoolId = data?.schoolId;
        this.user = data?.user;
        this.school = data?.school;

    }
}