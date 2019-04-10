interface IAuth {
    nickname?: string;
    password?: string;
}

export class Actor implements IAuth {

    id?: number;
    base64?: string;
    photo?: string;

    email: string;

    nickname?: string;
    password?: string;
    token?: string;

    constructor(data: any = {}) {
        this.id = data.id || null;
        this.base64 = data.base64 || null;
        this.photo = data.photo || null;
        this.email = data.email || null;
        this.nickname = data.nickname || null;
        this.password = data.password || null;
        this.token = data.token || null;
    }

    toJSON() {
        const res = {
            email: this.email
        };

        if (this.base64) {
            res['base64'] = this.base64;
        }

        if (this.photo) {
            res['photo'] = this.photo;
        }

        if (this.nickname) {
            res['nickname'] = this.nickname;
        }

        if (this.nickname) {
            res['nickname'] = this.nickname;
        }

        if (this.password) {
            res['password'] = this.password;
        }

        if (this.token) {
            res['token'] = this.token;
        }

        if (this.id) {
            res['id'] = this.id;
        }

        return res;
    }

}
