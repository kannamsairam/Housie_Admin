export class Admin {
    email: string;
    token: string;
    loggedIn: boolean;
    authorization: string;
    userName: string;
    userMobile: string;

    constructor(jsonObj: any) {
        if (jsonObj) {
            this.email = jsonObj && jsonObj.email ? jsonObj.email : '';
            this.token = jsonObj && jsonObj.token ? jsonObj.token : '';
            this.loggedIn = jsonObj && jsonObj.token ? jsonObj.token : false;
            this.authorization = jsonObj && jsonObj.authorization ? jsonObj.authorization : '';
            this.userName = jsonObj && jsonObj.userName ? jsonObj.userName : '';
            this.userMobile = jsonObj && jsonObj.userMobile ? jsonObj.userMobile : '';
        } else {
            this.email = '';
            this.token = '';
            this.loggedIn = false;
            this.authorization = '';
            this.userName = '';
            this.userMobile = '';
        }
    }
}