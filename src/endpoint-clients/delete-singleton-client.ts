import { ApiResponse } from "exprest-shared";
import { EndpointClient } from "./endpoint-client.js";
import { fetchFromApi } from "../fetch-from-api/fetch-helpers.js";
import { deleteSingletonRequest } from "../fetch-from-api/request-helpers.js";
import { RequestBuilder, RequestBuilderWithParams } from "../request-types.js";

export class DeleteSingletonClient<ApiReturnType extends Object> extends EndpointClient {
    async fetch(): Promise<ApiResponse<ApiReturnType>> { return fetchFromApi<ApiReturnType>(this.request()); }
    request: RequestBuilder = () => { return deleteSingletonRequest(this.url); } 
}

export class DeleteSingletonClientWithParams<
    ApiReturnType extends Object,
    QueryParamsType extends {[key: string]: string},
> extends EndpointClient {
    async fetch(params: {[key in keyof QueryParamsType]?: string}): Promise<ApiResponse<ApiReturnType>> {
        return fetchFromApi<ApiReturnType>(this.request(params));
    }

    request: RequestBuilderWithParams<QueryParamsType> =
        (params: {[key in keyof QueryParamsType]?: string}) => { return deleteSingletonRequest(this.url, params); }
}
