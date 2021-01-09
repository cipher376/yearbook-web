import { User } from './user';

export interface FriendshipInterface {
    id?: any;
    accepted: boolean;
    initiatorId?: any;
    acceptorId?: any;
    dateInitiated?: Date;
    dateAccepted?: Date;
    initiator?: User;
    acceptor?: User;
}

export class Friendship implements FriendshipInterface {
    id: any;
    accepted: boolean;
    initiatorId: any;
    acceptorId: any;
    dateInitiated: Date;
    dateAccepted: Date;
    initiator: User;
    acceptor: User;
    constructor(data?: FriendshipInterface) {
        Object.assign(this, data);
    }
}