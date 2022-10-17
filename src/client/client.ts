import {JWT, Provider} from "../types/types";
import {getAuthRedirectLink, login} from "../api/api"
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
}

