import { JWT, Provider, Event, Hackathon, Sponsor } from "../types/types";
import {
  getAuthRedirectLink,
  login,
  acceptApplicant,
  applyToHackathon,
  createEvent,
  createHackathon,
  createSponsor,
  deleteEvent,
  deleteHackathon,
  deleteSponsor,
} from "../api/api";
import { LoginPayload } from "../types/api-payloads";

export class Client {
  private apiUrl: string;
  private jwt: JWT | null;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
    this.jwt = null;
  }

  async login(
    code: string,
    provider: Provider,
    oAuthState: string
  ): Promise<LoginPayload> {
    const loginPayload = await login(this.apiUrl, code, provider, oAuthState);

    if (loginPayload.accountExists) {
      this.jwt = new JWT(loginPayload.accessToken!, loginPayload.refreshToken!);
    }
    return loginPayload;
  }

  async getAuthRedirectLink(provider: Provider) {
    return getAuthRedirectLink(this.apiUrl, provider);
  }

  async acceptApplicant(hackathonId: String, userId: String) {
    return acceptApplicant(this.apiUrl, hackathonId, userId);
  }

  async applyToHackathon(hackathonId: String) {
    return applyToHackathon(this.apiUrl, hackathonId);
  }

  //   async createEvent(input: Event) {
  //     return createEvent(this.apiUrl, input);
  //   }

  async createHackathon(input: Hackathon) {
    return createHackathon(this.apiUrl, input);
  }

  async createSponsor(input: Sponsor) {
    return createSponsor(this.apiUrl, input);
  }

  async deleteEvent(id: string) {
    return deleteEvent(this.apiUrl, id);
  }

  async deleteHackathon(id: string) {
    return deleteHackathon(this.apiUrl, id);
  }

  async deleteSponsor(id: string) {
    return deleteSponsor(this.apiUrl, id);
  }
}

