import {JWT, Provider} from "../types/types";
import {getAuthRedirectLink, login, getMe, getSponsor, getUsers, searchUser, refreshJWT} from "../api/api"
import {LoginPayload} from "../types/api-payloads";

export class Client {
    private apiUrl: string
    private jwt: JWT | null

    constructor(apiUrl: string) {
        this.apiUrl = apiUrl
        this.jwt = null
    }

    async login(code: string, provider: Provider, oAuthState: string): Promise<LoginPayload> {
        const loginPayload = await login(this.apiUrl, code, provider, oAuthState)

        if (loginPayload.accountExists) {
            this.jwt = new JWT(loginPayload.accessToken!, loginPayload.refreshToken!)
        }
        return loginPayload
    }

    async getAuthRedirectLink(provider: Provider) {
        return getAuthRedirectLink(this.apiUrl, provider)
    }

    async getMe(provider: Provider) {
        return getMe(this.apiUrl, provider)
    }
    
    async refreshJWT(provider: Provider) {
        return refreshJWT(this.apiUrl, provider)
    }
    
    async searchUser(provider: Provider) {
        return searchUser(this.apiUrl, provider)
    }
    
    async getSponsor(provider: Provider) {
        return getSponsor(this.apiUrl, provider)
    }
    
    async getUsers(provider: Provider) {
        return getUsers(this.apiUrl, provider)
    }
}

