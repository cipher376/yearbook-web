export interface PushMessageInterface {
    id?: any;
    receivers: string[];
    sender: string[];
    body: string;
    subject: string;
    dateCreated: Date;
    file: string;
    fileUrls: string[];
    topicId?: any;
    channel?: string;

}


export class PushMessage implements PushMessageInterface {
    id: any;
    receivers: string[];
    sender: string[];
    body: string;
    subject: string;
    dateCreated: Date;
    file: string;
    fileUrls: string[];
    topicId: any;
    channel?: string;
    constructor(data?: PushMessageInterface) {
        Object.assign(this, data);
    }

}