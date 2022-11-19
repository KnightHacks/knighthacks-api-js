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
        mutation DeleteUser($hackathonId: ID!, $userId: ID!) {
            denyApplicant(hackathonId: $hackathonId, userId: $userId)
        }`),

    REGISTER = (`
    
    `),

    UPDATE_EVENT = (`
    
    `),

    UPDATE_HACKATHON = (`
    
    `),

    UPDATE_SPONSER = (`
    
    `),

    UPDATE_USER = (`
    
    `),
}