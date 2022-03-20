function generateRandomToken() {;
    const token = Math.random().toString(16).substring(2);

    return token
};
export default class Users {
    id = Math.random().toString(16).substring(2);
   
    token: string = '';

    constructor(public login: string, public password: string) {};

    setLogin () {
        this.token = generateRandomToken();
    }
    setLogout () {
        this.token = '';
    };
};
 


