import {JWT, Provider, User, SponsorsConnection, SponsorFilter, UsersConnection} from "../types/types";
import {Query} from "./query";
import {LoginPayload} from "../types/api-payloads";
import fetch from "node-fetch";

export async function login(apiUrl: string, code: string, provider: Provider, oAuthState: string): Promise<LoginPayload> {
    let variables: { [key: string]: any } = {
        "code": code,
        "provider": provider,
        "state": oAuthState
    }
    return await doRequest<LoginPayload>(apiUrl, null, Query.LOGIN, variables)
}

export async function getAuthRedirectLink(apiUrl: string, provider: Provider): Promise<string> {
    let variables: { [key: string]: any } = {
        "provider": provider
    }
    return await doRequest<string>(apiUrl, null, Query.LOGIN, variables)
}

export async function getMe(apiUrl: string): Promise<User> {
    let variables: { [key: string]: any } = {}

    return await doRequest<User>(apiUrl, null, Query.GET_ME, variables)
}

export async function refreshJWT(apiUrl: string, refreshToken: string): Promise<string> {
    let variables: { [key: string]: any } = {
        "refreshToken": refreshToken
    }
    return await doRequest<string>(apiUrl, null, Query.REFRESH_JWT, variables)
}

export async function searchUser(apiUrl: string, name: string): Promise<[User]> {
    let variables: { [key: string]: any } = {
        "name": name
    }
    return await doRequest<[User]>(apiUrl, null, Query.SEARCH_USER, variables)
}

export async function getSponsor(apiUrl: string, first: number, after: string, filter: SponsorFilter): Promise<SponsorsConnection> {
    let variables: { [key: string]: any } = {
        "first": first,
        "after": after,
        "filter": filter
    }
    return await doRequest<SponsorsConnection>(apiUrl, null, Query.GET_SPONSOR, variables)
}

export async function getUsers(apiUrl: string, first: number, after: string): Promise<UsersConnection> {
    let variables: { [key: string]: any } = {
        "first": first,
        "after": after
    }
    return await doRequest<UsersConnection>(apiUrl, null, Query.GET_USERS, variables)
}

async function doRequest<T>(apiUrl: string, jwt: JWT | null, query: Query, variables: { [key: string]: any } | null): Promise<T> {
    let requestBody: { query: Query, variables: { [key: string]: any } | null } = {query: query, variables: null}
    if (variables != null && variables.size > 0) {
        requestBody["variables"] = variables
    }

    let requestHeaders: { [key: string]: string } = {"Content-Type": "application/json"}
    if (jwt != null) {
        requestHeaders["authorization"] = jwt.accessToken
    }

    const response = await fetch(apiUrl, {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify(requestBody)
    })
    /*


    JSON:
    {
    "data": {},
    "errors": [{}]}
     */

    const graphqlResponse = await response.json() as GraphQLResponse<T>;

    if (response.ok && (graphqlResponse.errors == null || graphqlResponse.errors.length == 0)) {
        const response = graphqlResponse.data?.response
        if (response) {
            return response as T
        } else {
            throw new Error("Unable to find expected response object, shouldn't happen probably graphql error present.")
        }
    } else {
        throw new Error(graphqlResponse.errors?.map(e => e.message).join('\n') ?? 'unknown')
    }

}

type GraphQLResponse<T> = {
    data: {
        response: T
    }
    errors: GraphQLError[]
}

type GraphQLError = {
    message: string
}