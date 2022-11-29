import {JWT, Provider, SponsorFilter} from "../types/types";
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

    async getMe() {
        return getMe(this.apiUrl)
    }
    
    async refreshJWT(refreshToken: string) {
        return refreshJWT(this.apiUrl, refreshToken)
    }
    
    async searchUser(name: string) {
        return searchUser(this.apiUrl, name)
    }
    
    async getSponsor(first: number, after: string, filter: SponsorFilter) {
        return getSponsor(this.apiUrl, first, after, filter)
    }
    
    async getUsers(first: number, after: string) {
        return getUsers(this.apiUrl, first, after)
    }
}

