export class login {
    email : string;
    password  : string;
    constructor(email : string, password : string){
        this.email = email;
        this.password = password;
    }
}
export class user {
    id?: number;
    email : string;
    password  : string;
    username : string;
    constructor(email : string, password : string, username : string, id : number){
        this.email = email;
        this.password = password;
        this.username = username;
        this.id = id;
    }
}