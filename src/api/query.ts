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

    DELETE_USER = (`
        mutation DeleteUser($deleteUserId: ID!) {
            deleteUser(id: $deleteUserId)
        }`),

    DENY_APPLICANT = (`
        mutation DenyApplicant($hackathonId: ID!, $userId: ID!) {
            denyApplicant(hackathonId: $hackathonId, userId: $userId)
        }`),

    REGISTER = (`
        mutation Register($encryptedOAuthAccessToken: String!, $input: NewUser!, $provider: Provider!) {
            register(encryptedOAuthAccessToken: $encryptedOAuthAccessToken, input: $input, provider: $provider) {
            accessToken
            refreshToken
            user {
                age
                email
                firstName
                fullName
                id
                lastName
                phoneNumber
                oAuth {
                provider
                uid
                }
                pronouns {
                objective
                subjective
                }
                role
            }
            }
        }
    `),

    UPDATE_EVENT = (`
        mutation UpdateEvent($updateEventId: ID!, $input: UpdatedEvent!) {
            updateEvent(id: $updateEventId, input: $input) {
            description
            end_date
            id
            location
            name
            start_date
            }
        }
    `),

    UPDATE_HACKATHON = (`
        mutation UpdateHackathon($updateHackathonId: ID!, $input: HackathonUpdateInput!, $userId: ID!, $attendingUserId2: ID!) {
            updateHackathon(id: $updateHackathonId, input: $input) {
            endDate
            id
            pending(userId: $userId)
            sponsors {
                pageInfo {
                endCursor
                startCursor
                }
                totalCount
                sponsors {
                tier
                website
                since
                name
                logo
                id
                description
                }
            }
            startDate
            term {
                semester
                year
            }
            status
            events {
                events {
                description
                end_date
                id
                location
                name
                start_date
                }
            }
            attending(userId: $attendingUserId2)
            attendees {
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
                }
            }
            applicants {
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
                }
            }
            }
        }
    `),

    UPDATE_SPONSER = (`
        mutation UpdateSponsor($updateSponsorId: ID!, $input: UpdatedSponsor!) {
            updateSponsor(id: $updateSponsorId, input: $input) {
            description
            id
            logo
            name
            since
            tier
            website
            }
        }
    `),

    UPDATE_USER = (`
        mutation UpdateUser($updateUserId: ID!, $input: UpdatedUser!) {
            updateUser(id: $updateUserId, input: $input) {
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
                subjective
                objective
            }
            role
            }
        }
    `),
}