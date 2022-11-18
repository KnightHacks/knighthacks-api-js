import {JWT, Provider} from "../types/types";
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
        "provider": provider,
    }
    return await doRequest<string>(apiUrl, null, Query.LOGIN, variables)
}

export async function getMe(apiUrl: string, provider: Provider): Promise<string> {
    let variables: { [key: string]: any } = {
        "provider": provider,
    }
    return await doRequest<string>(apiUrl, null, Query.LOGIN, variables)
}

export async function refreshJWT(apiUrl: string, provider: Provider): Promise<string> {
    let variables: { [key: string]: any } = {
        "provider": provider,
    }
    return await doRequest<string>(apiUrl, null, Query.LOGIN, variables)
}

export async function searchUser(apiUrl: string, provider: Provider): Promise<string> {
    let variables: { [key: string]: any } = {
        "provider": provider,
    }
    return await doRequest<string>(apiUrl, null, Query.LOGIN, variables)
}

export async function getSponsor(apiUrl: string, provider: Provider): Promise<string> {
    let variables: { [key: string]: any } = {
        "provider": provider,
    }
    return await doRequest<string>(apiUrl, null, Query.LOGIN, variables)
}

export async function getUsers(apiUrl: string, provider: Provider): Promise<string> {
    let variables: { [key: string]: any } = {
        "provider": provider,
    }
    return await doRequest<string>(apiUrl, null, Query.LOGIN, variables)
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