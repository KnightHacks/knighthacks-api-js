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
    GET_ME = (`
        query Me {
            me {
            firstName
            lastName
            fullName
            id
            age
            email
            phoneNumber
            pronouns {
                objective
                subjective
            }
            role
            oAuth {
                provider
                uid
            }
            appliedHackathons {
                id
            }
            attendedHackathons {
                id
            }
        }
        }`),
    REFRESH_JWT = (`
        query Query($refreshToken: String!) {
            refreshJWT(refreshToken: $refreshToken)
        }`),
    SEARCH_USER = (`
        query SearchUser($name: String!) {
            searchUser(name: $name) {
            fullName
            firstName
            lastName
            id
            email
            age
            phoneNumber
            pronouns {
                subjective
                objective
            }
            role
            oAuth {
                provider
                uid
            }
            appliedHackathons {
                id
            }
            attendedHackathons {
                id
            }
        }
        }`),
    GET_SPONSOR = (`
        query Sponsors($first: Int!, $after: String, $filter: SponsorFilter) {
            sponsors(first: $first, after: $after, filter: $filter) {
            pageInfo {
                endCursor
                startCursor
            }
            totalCount
            sponsors {
                description
                id
                logo
                name
                since
                tier
                website
            }
        }
        }`),
    GET_USERS = (`
        query Users($first: Int!, $after: String) {
            users(first: $first, after: $after) {
            pageInfo {
                endCursor
                startCursor
            }
            totalCount
            users {
                age
                email
                firstName
                fullName
                id
                lastName
                oAuth {
                    provider
                    uid
                }
                phoneNumber
                pronouns {
                    objective
                    subjective
                }
                role
                appliedHackathons {
                    id
                }
                attendedHackathons {
                    id
                }
            }
        }}`)
}