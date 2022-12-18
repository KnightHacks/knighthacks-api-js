export const enum Query {
    LOGIN = (`
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
        }`),
    GET_AUTH_REDIRECT_LINK = (`
        query Request($provider: Provider!) {
            getAuthRedirectLink(provider: $provider)
        }`),

    GET_CURRENT_HACKATHON = (`
        query CurrentHackathon($status: ApplicationStatus!, $after: ID, $first: Int!, $eventsAfter2: ID, $eventsFirst2: Int!, $sponsorsAfter2: ID, $sponsorsFirst2: Int!) {
            currentHackathon {
                applications(status: $status, after: $after, first: $first) {
                    applications {
                        id
                    }
                    pageInfo {
                        endCursor
                        startCursor
                    }
                    totalCount
                }
                endDate
                events(after: $eventsAfter2, first: $eventsFirst2) {
                    events {
                        id
                    }
                    pageInfo {
                        endCursor
                        startCursor
                    }
                    totalCount
                }
                id
                sponsors(after: $sponsorsAfter2, first: $sponsorsFirst2) {
                    pageInfo {
                        endCursor
                        startCursor
                    }
                    sponsors {
                        id
                    }
                    totalCount
                }
                startDate
                status
                term {
                    semester
                    year
                }
            }
        }`)
}