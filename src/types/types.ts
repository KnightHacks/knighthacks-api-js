export class JWT {
    accessToken: string
    refresh: string

    constructor(accessToken: string, refresh: string) {
        this.accessToken = accessToken
        this.refresh = refresh
    }
}

export type User = {
    age: number
    //appliedHackathons: [Hackathon!]! @join__field(graph: HACKATHON)
    //attendedHackathons: [Hackathon!]! @join__field(graph: HACKATHON)
    email: string
    firstName: string
    fullName: string
    id: number
    lastName: string
    oAuth: OAuth
    phoneNumber: string
    pronouns: Pronouns | null
    role: Role
}

export type Pronouns = {
    subjective: string
    objective: string
}

export type OAuth = {
    provider: Provider
    uid: string
}

export enum Role {
    ADMIN = "ADMIN",
    SPONSOR = "SPONSOR",
    NORMAL = "NORMAL",
    OWNS = "OWNS"
}

export enum Provider {
    GITHUB = "GITHUB",
    GMAIL = "GMAIL"
}
