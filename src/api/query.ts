export const enum Query {
  LOGIN = `
    query Request($code: string!, $provider: Provider!, $state: string!) {
      login(code: $code, provider: $provider, state: $state) {
        user {
          id
        }
        refreshToken
        encryptedOAuthAccessToken
        accountExists
        accessToken
      }
    }`,
  GET_AUTH_REDIRECT_LINK = `
    query Request($provider: Provider!) {
      getAuthRedirectLink(provider: $provider)
    }`,
  ACCEPT_APPLICANT = `
    mutation AcceptApplicant($hackathonId: ID!, $userId: ID!) {
      acceptApplicant(hackathonId: $hackathonId, userId: $userId)
    }`,
  APPLY_TO_HACKATHON = `
    mutation ApplyToHackathon($hackathonId: ID!) {
      applyToHackathon(hackathonId: $hackathonId)
    }`,
  CREATE_EVENT = `
    mutation CreateEvent($input: NewEvent!) {
      createEvent(input: $input) {
        id
        location
        name
        start_date
        end_date
        description
      }
    }`,
  CREATE_HACKATHON = `
    mutation CreateHackathon($input: HackathonCreateInput!) {
      createHackathon(input: $input) {
        endDate
        id
        startDate
        status
      }
    }`,
  CREATE_SPONSOR = `
    mutation CreateSponsor($input: NewSponsor!) {
      createSponsor(input: $input) {
        description
        id
        logo
        name
        since
        tier
        website
      }
    }`,
  DELETE_EVENT = `
    mutation DeleteEvent($deleteEventId: ID!) {
      deleteEvent(id: $deleteEventId)
    }`,
  DELETE_HACKATHON = `
    mutation DeleteHackathon($deleteHackathonId: ID!) {
      deleteHackathon(id: $deleteHackathonId)
    }`,
  DELETE_SPONSOR = `
    mutation DeleteSponsor($deleteSponsorId: ID!) {
      deleteSponsor(id: $deleteSponsorId)
    }`,
}

