

export class CookieBrowser {
    cookies: any;

    constructor() {

    }

    set(key: string, value: any, expires?: Date): void {
        this.cookies[key] = value;
        let cookie = `${key}=${encodeURI(value)}; path=/${expires ? `; expires=${expires.toUTCString()}` : ''}`;
        window.document.cookie = cookie;
    }

    get(key: string): any {
        if (!this.cookies[key]) {
            let cookie = window.document
                .cookie.split('; ')
                .filter((item: any) => item.split('=')[0] === key).pop();
            if (!cookie) {
                return null;
            }
            this.cookies[key] = this.parse(cookie.split('=').slice(1).join('='));
        }
        return this.cookies[key];
    }

    remove(key: string) {
        document.cookie = key + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        delete this.cookies[key];
    }

    private parse(value: any) {
        try {
            return JSON.parse(decodeURI(value));
        } catch (e) {
            return value;
        }
    }
}