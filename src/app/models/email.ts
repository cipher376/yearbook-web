export interface EmailInterface {
    to: string;
    from: string;
    subject: string;
    text?: string;
    html?: string;
    id?: number;
}

export class Email implements EmailInterface {
    to: string;
    from: string;
    subject: string;
    text: string;
    html: string;
    id: number;
    constructor(data?: EmailInterface) {
        Object.assign(this, data);
    }

}
