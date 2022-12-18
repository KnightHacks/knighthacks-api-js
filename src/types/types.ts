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

export type Hackathon = {
    applications: HackathonApplicationConnection
    endDate: Time
    events: EventsConnection
    id: number
    sponsors: SponsorsConnection
    startDate: Time
    status: HackathonStatus
    term: Term
}


export type HackathonApplicationConnection implements Connection = {
    applications: [HackathonApplication]
    pageInfo: PageInfo
    totalCount: number
}

export interface Connection {
    pageInfo: PageInfo
    totalCount: number
}

export type HackathonApplication = {
    hackathon: Hackathon
    id: number
    resumeUrl: string
    shareInfoWithSponsors: boolean
    status: ApplicationStatus
    user: User
    whatDoYouWantToLearn: [String]
    whyAttend: [String]
}

export enum ApplicationStatus {
    ACCEPTED = "ACCEPTED",
    REJECTED = "REJECTED",
    WAITING = "WAITING"
}

export type PageInfo = {
    endCursor: string
    startCursor: string
}

export type Time = {
    Time: Date
}

export type EventsConnection implements Connection = {
    events: [Event]
    pageInfo: PageInfo
    totalCount: number
}

export type Event = {
    description: string
    end_date: Time
    hackathon: Hackathon
    id: number
    location: string
    name: string
    start_date: Time
}

export type SponsorsConnection implements Connection = {
    pageInfo: PageInfo
    sponsors: [Sponsor]
    totalCount: number
}

export type Sponsor = {
    description: string
    hackathons: [Hackathon]
    id: number
    logo: string
    name: string
    since: Time
    tier: SubscriptionTier
    website: string
}

export enum SubscriptionTier {
    BRONZE = "BRONZE",
    GOLD = "GOLD",
    PLATINUM = "PLATINUM",
    SILVER = "SILVER"
}

export enum HackathonStatus {
    FUTURE = "FUTURE",
    PAST = "PAST",
    PRESENT = "PRESENT"
}

export type Term = {
    semester: Semester
    year: number
}

export enum Semester {
    FALL = "FALL",
    SPRING = "SPRING",
    SUMMER = "SUMMER"
}



