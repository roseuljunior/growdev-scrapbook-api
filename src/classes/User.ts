import Errands from "./Errands"

export default class Users {
    id = Math.random().toString(16).substring(2)
    errands: Errands[] = []
    constructor(public login: string, public password: string) {}
}



