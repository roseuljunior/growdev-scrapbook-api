export default class Errands {
    id = Math.random().toString(16).substring(2);
    constructor(public userId: string, public title: string, public description: string) {};
};