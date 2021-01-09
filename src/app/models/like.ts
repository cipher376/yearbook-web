
export interface LikeInterface {
    id?: any;
    rate?: boolean;
    initiatorId?: any;
    receiverId?: any;
    receiverName?: any;
}

export class Like implements LikeInterface {
    id?: any;
    rate?: boolean;
    initiatorId?: any;
    receiverId?: any;
    receiverName?: any;
    
    constructor(data?: LikeInterface) {
        Object.assign(this, data);
    }
}