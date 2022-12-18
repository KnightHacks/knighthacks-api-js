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

    CURRENT_HACKATHON = (`
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
        }`),

    EVENTS = (`
        query Events($after: ID, $first: Int!) {
            events(after: $after, first: $first) {
                events {
                    description
                    end_date
                    hackathon {
                        id
                    }
                    id
                    location
                    name
                    start_date
                }
                pageInfo {
                    endCursor
                    startCursor
                }
                totalCount
            }
        }`),

    GET_APPLICATION = (`
        query GetApplication($hackathonId: ID!, $userId: ID!) {
            getApplication(hackathonId: $hackathonId, userId: $userId) {
                hackathon {
                    id
                }
                id
                resumeUrl
                shareInfoWithSponsors
                status
                user {
                    id
                }
                whatDoYouWantToLearn
                whyAttend
            }
        }`),

    GET_HACKATHON = (`
        query GetHackathon($getHackathonId: ID!, $after: ID, $first: Int!, $status: ApplicationStatus!, $eventsAfter2: ID, $eventsFirst2: Int!, $sponsorsAfter2: ID, $sponsorsFirst2: Int!) {
            getHackathon(id: $getHackathonId) {
                applications(after: $after, first: $first, status: $status) {
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