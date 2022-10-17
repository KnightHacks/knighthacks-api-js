import {User} from "./types";

export type LoginPayload = {
    /*
    If false then you must register immediately following this. Else, you are logged in and have access to your own user.
    */
    accountExists: Boolean

    accessToken: string | null
    encryptedOAuthAccessToken: string | null
    refreshToken: string | null
    user: User | null
}

export type RegistrationPayload = {
    accessToken: string
    refreshToken: string
    user: User
}