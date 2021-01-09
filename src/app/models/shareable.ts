import { User } from 'src/app/models/user';
import { Post } from './post';

export enum EntityType {
    Post = 1,
    Document = 2,
    Photo = 3,
    Video = 4,
    Audio = 5
}
export interface ShareableInterface {
    message: string;
    subject: string;
    image?: string;
    url?: string;
    emailRecipients?: string[];
}

export class Shareable implements ShareableInterface {
    message: string;
    subject: string;
    image?: string;
    url?: string;
    emailRecipients?: string[];
    entityType?: EntityType;
    constructor(data?: ShareableInterface) {
        Object.assign(this, data);
    }

}