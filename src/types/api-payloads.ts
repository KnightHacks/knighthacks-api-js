import {
  User,
  Hackathon,
  SubscriptionTier,
  HackathonStatus,
  Term,
} from "./types";

export type LoginPayload = {
  /*
    If false then you must register immediately following this. Else, you are logged in and have access to your own user.
    */
  accountExists: Boolean;

  accessToken: string | null;
  encryptedOAuthAccessToken: string | null;
  refreshToken: string | null;
  user: User | null;
};

export type RegistrationPayload = {
  accessToken: string;
  refreshToken: string;
  user: User;
};

export type EventPayload = {
  description: string;
  // end_date: string
  // hackathon: Hackathon
  id: string;
  location: string;
  name: string;
  start_date: string;
};

export type SponsorPayload = {
  description: string;
  hackathons: [Hackathon];
  id: string;
  logo: string;
  name: string;
  since: string;
  tier: SubscriptionTier;
  website: string;
};

export type HackathonPayload = {
  endDate: string;
  id: string;
  pending: Boolean;
  startDate: string;
  status: HackathonStatus;
  term: Term;
};

