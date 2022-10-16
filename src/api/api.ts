import {JWT} from "../types/types";
import {Query} from "./query";

export function login(apiUrl: string, jwt: JWT): boolean{

    return true
}


async function doRequest<T>(apiUrl: string, jwt: JWT | null, query: Query, variables: Map<string, any> | null) {
    let requestBody = {"query": query};
    if (variables != null && variables.size > 0) {
        requestBody["variables"] = variables
    }

    let requestHeaders = {"Content-Type": "application/json"}
    if (jwt != null) {
        requestHeaders["authorization"] = jwt.Current
    }

    const response = await fetch(apiUrl, {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify(requestBody)
    })

    const {data, errors}: { any, [] } = response.json()
    if (response.ok && (errors == null || errors.size == 0)) {
        const response = data?.response
        if (response) {
            return response as T
        } else {
            return Promise.reject(new Error("Unable to find expected response object, shouldn't happen probably graphql error present."))
        }
    } else {
        return Promise.reject(new Error(errors?.map(e => e.message).join('\n') ?? 'unknown'))
    }

}