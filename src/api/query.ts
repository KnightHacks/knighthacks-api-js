export const enum Query {
    LOGIN = (
        `query Request($code: String!, $provider: Provider!, $state: String!) {
          login(code: $code, provider: $provider, state: $state) {
            user {
              id
            }
            refreshToken
            encryptedOAuthAccessToken
            accountExists
            accessToken
          }
        }`)


}