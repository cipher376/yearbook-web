import { PushTopic } from "./push-topic";
import { User } from "./user";

export interface MyDeviceInterface {
    id?: any;
    token: string;
    playerId?: any;
    platform: string;
    uuid: string;
    user?: User;
    topics?: PushTopic[];
}

export class MyDevice implements MyDeviceInterface {
    id: any;
    token: string;
    playerId: any;
    platform: string;
    uuid: string;
    user?: User;
    topics?: PushTopic[];
    constructor(data?: MyDeviceInterface) {
        Object.assign(this, data);
    }

}