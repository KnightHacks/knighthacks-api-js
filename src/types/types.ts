export class JWT {
    accessToken: string;
    refresh: string;
  
    constructor(accessToken: string, refresh: string) {
      this.accessToken = accessToken;
      this.refresh = refresh;
    }
  }
  
  export enum Semester {
    "FALL",
    "SPRING",
    "SUMMER",
  }
  
  export enum SubscriptionTier {
    "BRONZE",
    "GOLD",
    "PLATINUM",
    "SILVER",
  }
  
  export enum HackathonStatus {
    "FUTURE",
    "PAST",
    "PRESENT",
  }
  
  export type Term = {
    semester: Semester;
    year: number;
  };
  
  export type User = {
    age: number;
    //appliedHackathons: [Hackathon!]! @join__field(graph: HACKATHON)
    //attendedHackathons: [Hackathon!]! @join__field(graph: HACKATHON)
    email: string;
    firstName: string;
    fullName: string;
    id: number;
    lastName: string;
    oAuth: OAuth;
    phoneNumber: string;
    pronouns: Pronouns | null;
    role: Role;
  };
  
  export type Event = {
    description: string;
    //   end_date: string;
    location: string;
    name: string;
    start_date: string;
  };
  
  export type Sponsor = {
    description: string;
    hackathons: [Hackathon];
    id: string;
    logo: string;
    name: string;
    since: string;
    tier: SubscriptionTier;
    website: string;
  };
  
  export type Hackathon = {
    endDate: string;
    events: [Event];
    semester: Semester;
    sponsors: [Sponsor];
    startDate: string;
    year: number;
  };
  
  export type Pronouns = {
    subjective: string;
    objective: string;
  };
  
  export type OAuth = {
    provider: Provider;
    uid: string;
  };
  
  export enum Role {
    ADMIN = "ADMIN",
    SPONSOR = "SPONSOR",
    NORMAL = "NORMAL",
    OWNS = "OWNS",
  }
  
  export enum Provider {
    GITHUB = "GITHUB",
    GMAIL = "GMAIL",
  }

  export type PageInfo = {
    endCursor: string
    startCursor: string
  }

  interface Connection {
    pageInfo: PageInfo
    totalCount: number
  }

  export interface SponsorsConnection extends Connection {
    pageInfo: PageInfo
    sponsors: [Sponsor]
    totalCount: number
  }

  export interface UsersConnection extends Connection {
    pageInfo: PageInfo
    totalCount: number
    users: [User]
  }

  export type SponsorFilter = {
    tiers: [SubscriptionTier]
  }
