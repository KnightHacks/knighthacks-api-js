import {JWT, Provider, User, NewUser, HackathonUpdateInput, UpdatedSponsor, UpdatedEvent, UpdatedUser} from "../types/types";
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

export async function deleteUser(apiUrl: string, deleteUserId: number): Promise<string> {
    let variables: { [key: string]: any } = {
        "deleteUserId": deleteUserId,
    }
    return await doRequest<string>(apiUrl, null, Query.DELETE_USER, variables)
}

export async function denyApplicant(apiUrl: string, hackathonId: number, userId: number): Promise<string> {
    let variables: { [key: string]: any } = {
        "hackathonId": hackathonId, 
        "userId": userId
    }
    return await doRequest<string>(apiUrl, null, Query.DENY_APPLICANT, variables)
}

export async function register(apiUrl: string, encryptedOAuthAccessToken: string, provider:Provider, input:NewUser) {
    let variables: { [key: string]: any } = {
        "encryptedOAuthAccessToken": encryptedOAuthAccessToken,
        "provider": provider, 
        "input": input
    }
    return await doRequest<string>(apiUrl, null, Query.REGISTER, variables)
}

export async function updateEvent(apiUrl: string, updateEventId:number, input:UpdatedEvent) {
    let variables: { [key: string]: any } = {
        "updateEventId": updateEventId, 
        "input": input
    }
    return await doRequest<string>(apiUrl, null, Query.UPDATE_EVENT, variables)
}

export async function updateHackathon(apiUrl: string, updateHackathonId:number, input:HackathonUpdateInput, userId: number, attendingUserId2:number) {
    let variables: { [key: string]: any } = {
        "updateHackathonId": updateHackathonId, 
        "input": input,
        "userId":userId,
        "attendingUserId2":attendingUserId2
    }
    return await doRequest<string>(apiUrl, null, Query.UPDATE_HACKATHON, variables)
}

export async function updateSponsor(apiUrl: string, updateSponsorId:number, input:UpdatedSponsor) {
    let variables: { [key: string]: any } = {
        "updateSponsorId": updateSponsorId, 
        "input": input
    }
    return await doRequest<string>(apiUrl, null, Query.UPDATE_SPONSER, variables)
}

export async function updateUser(apiUrl: string, updateUserId:number, input:UpdatedUser) {
    let variables: { [key: string]: any } = {
        "updateUserId": updateUserId, 
        "input": input
    }
    return await doRequest<string>(apiUrl, null, Query.UPDATE_USER, variables)
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