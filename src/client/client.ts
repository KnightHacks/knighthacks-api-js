import {JWT} from "../types/types";
import {login} from "../api/api"

export class Client {
    private apiUrl: string
    private jwt: JWT

    constructor(apiUrl: string) {
        this.apiUrl = apiUrl
    }

    login(): boolean {
        return login(this.apiUrl, this.jwt)

    }

}

