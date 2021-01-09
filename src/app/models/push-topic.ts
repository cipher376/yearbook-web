import { PushMessage } from "./push-message";
import { User } from "./user";

export interface PushTopicInterface {
    id?: any;
    name: string;
    messages?: PushMessage[];
    channelId: string; // UUID
    dateCreated: string;
    createdBy: User;

}

export class PushTopic implements PushTopicInterface {
    id: any;
    name: string;
    messages?: PushMessage[];
    channelId: string; // UUID
    dateCreated: string;
    createdBy: User;
    constructor(data?: PushTopicInterface) {
        Object.assign(this, data);
    }

}