import { EventsConnection, Hackathon, HackathonApplication, JWT, Provider } from "../types/types";
import { getApplication, getAuthRedirectLink, getCurrentHackathon, getEvents, getHackathon, login } from "../api/api"
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

    async currentHackathon(status: string, after: string, first: string, eventsAfter2: string, eventsFirst2: string, sponsorsAfter2: string, sponsorsFirst2: string): Promise<Hackathon> {
        const currentHackathon = await getCurrentHackathon(this.apiUrl, status, after, first, eventsAfter2, eventsFirst2, sponsorsAfter2, sponsorsFirst2)
        return currentHackathon
    }

    async events(after: string, first: string): Promise<EventsConnection> {
        const events = await getEvents(this.apiUrl, after, first)
        return events
    }

    async getApplication(hackathonId: string, userId: string): Promise<HackathonApplication> {
        const application = await getApplication(this.apiUrl, hackathonId, userId)
        return application
    }

    async getAuthRedirectLink(provider: Provider) {
        return getAuthRedirectLink(this.apiUrl, provider)
    }

    async getHackathon(getHackathonId: string, after: string, first: string, status: string, eventsAfter2: string, eventsFirst2: string, sponsorsAfter2: string, sponsorsFirst2: string): Promise<Hackathon> {
        const hackathon = await getHackathon(this.apiUrl, getHackathonId, after, first, status, eventsAfter2, eventsFirst2, sponsorsAfter2, sponsorsFirst2)
        return hackathon
    }

}

