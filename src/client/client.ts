import { ApplicationStatus, EventsConnection, Hackathon, HackathonApplication, HackathonFilter, JWT, Provider, User } from "../types/types";
import { getApplication, getAuthRedirectLink, getCurrentHackathon, getEvents, getHackathon, getHackathons, getUser, login } from "../api/api"
import { LoginPayload } from "../types/api-payloads";

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

    async currentHackathon(status: ApplicationStatus, after: number, first: number, eventsAfter2: number, eventsFirst2: number, sponsorsAfter2: number, sponsorsFirst2: number): Promise<Hackathon> {
        const currentHackathon = await getCurrentHackathon(this.apiUrl, status, after, first, eventsAfter2, eventsFirst2, sponsorsAfter2, sponsorsFirst2)
        return currentHackathon
    }

    async events(after: number, first: number): Promise<EventsConnection> {
        const events = await getEvents(this.apiUrl, after, first)
        return events
    }

    async getApplication(hackathonId: number, userId: number): Promise<HackathonApplication> {
        const application = await getApplication(this.apiUrl, hackathonId, userId)
        return application
    }

    async getAuthRedirectLink(provider: Provider) {
        return getAuthRedirectLink(this.apiUrl, provider)
    }

    async getHackathon(getHackathonId: number, after: number, first: number, status: ApplicationStatus, eventsAfter2: number, eventsFirst2: number, sponsorsAfter2: number, sponsorsFirst2: number): Promise<Hackathon> {
        const hackathon = await getHackathon(this.apiUrl, getHackathonId, after, first, status, eventsAfter2, eventsFirst2, sponsorsAfter2, sponsorsFirst2)
        return hackathon
    }

    async getUser(getUserId: number): Promise<User> {
        const user = await getUser(this.apiUrl, getUserId)
        return user
    }

    async hackathons(filter: HackathonFilter, after: number, first: number, status: ApplicationStatus, eventsAfter2: number, eventsFirst2: number, sponsorsAfter2: number, sponsorsFirst2: number): Promise<Hackathon[]> {
        const hackathons: Hackathon[] = await getHackathons(this.apiUrl, filter, after, first, status, eventsAfter2, eventsFirst2, sponsorsAfter2, sponsorsFirst2)
        return hackathons
    }
}

