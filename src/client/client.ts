import {JWT, Provider, NewUser, HackathonUpdateInput, UpdatedEvent, UpdatedSponsor, UpdatedUser} from "../types/types";
import {getAuthRedirectLink, login, deleteUser, denyApplicant, register, updateEvent, updateHackathon, updateSponsor, updateUser} from "../api/api"
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

    async deleteUser(deleteUserId: number) {
        return deleteUser(this.apiUrl, deleteUserId)
    }

    async denyApplicant(hackathonId: number, userId: number) {
        return denyApplicant(this.apiUrl, hackathonId, userId)
    }

    async register(encryptedOAuthAccessToken: string, provider:Provider, input: NewUser) {
        return register(this.apiUrl, encryptedOAuthAccessToken, provider, input)
    }

    async updateEvent(updateEventId:number, input:UpdatedEvent){
        return updateEvent(this.apiUrl, updateEventId, input)
    }

    async updateHackathon(updateHackathonId:number, input:HackathonUpdateInput, userId: number, attendingUserId2:number){
        return updateHackathon(this.apiUrl, updateHackathonId, input, userId, attendingUserId2)
    }

    async updateSponsor(updateSponsorId:number, input:UpdatedSponsor){
        return updateSponsor(this.apiUrl, updateSponsorId, input)
    }

    async updateUser(updateUserId:number, input:UpdatedUser){
        return updateUser(this.apiUrl, updateUserId, input)
    }
}

