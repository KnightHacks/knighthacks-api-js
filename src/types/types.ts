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

export type Event = {
    description: string,
    end_date: Date,
    //hackathon: Hackathon!,
    id: number,
    location: string,
    name: string,
    start_date: Date,
}

export type UpdatedEvent = {
    description: string,
    end_date: Date,
    location: string,
    name: string,
    start_date: Date,
}

export type NewUser = {
    age: number,
    email: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    pronouns: PronounsInput
  }

export type PronounsInput = {
    oobjective: string,
    subjective: string
}

export enum Semester {
    FALL = 'FALL',
    SPRING = 'SPRING',
    SUMMER = 'SUMMER',
}

export enum SubscriptionTier {
    BRONZE = 'BRONZE',
    GOLD = 'GOLD',
    PLATINUM = 'PLATINUM',
    SILVER = 'SILVER'
}

export type HackathonUpdateInput = {
    addedEvents: [number]
    addedParticipants: [number]
    addedSponsors: [number]
    removedEvents: [number]
    removedParticipants: [number]
    removedSponsors: [number]
    semester: Semester
    year: number
  }

export type UpdatedSponsor = {
    description: string,
    logo: string,
    name: string,
    since: string,
    tier: SubscriptionTier,
    website: string
  }

export type UpdatedUser = {
    age: number,
    email: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    pronouns: PronounsInput
  }