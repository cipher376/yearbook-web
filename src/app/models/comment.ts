import { User } from 'src/app/models/user';
import { Post } from './post';
export interface CommentInterface {
    id?: any;
    message: string;
    initiatorId: any;
    dateCreated?: Date;
    creator?: User;
    post?: Post;
    postId?: any;
}

export class Comment implements CommentInterface {
    id: any;
    message: string;
    initiatorId: number;
    dateCreated: Date;
    creator: User;
    post?: Post;
    postId?: any;
    constructor(data?: CommentInterface) {
        Object.assign(this, data);
    }

}