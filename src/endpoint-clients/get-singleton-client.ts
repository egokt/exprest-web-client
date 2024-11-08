import { ApiResponse } from "exprest-shared";
import { EndpointClient } from "./endpoint-client.js";
import { fetchFromApi } from "../fetch-from-api/fetch-helpers.js";
import { getSingletonRequest } from "../fetch-from-api/request-helpers.js";
import { RequestBuilder, RequestBuilderWithParams } from "../request-types.js";

export class GetSingletonClient<ApiReturnType extends Object> extends EndpointClient {
    async fetch(): Promise<ApiResponse<ApiReturnType>> { return fetchFromApi<ApiReturnType>(this.request()); }
    request: RequestBuilder = () => { return getSingletonRequest(this.url); } 
}


export class GetSingletonClientWithParams<
    ApiReturnType extends Object,
    QueryParamsType extends {[key: string]: string},
> extends EndpointClient {
    async fetch(params: {[key in keyof QueryParamsType]?: string}): Promise<ApiResponse<ApiReturnType>> {
        return fetchFromApi<ApiReturnType>(this.request(params));
    }

    request: RequestBuilderWithParams<QueryParamsType> = (params: {[key in keyof QueryParamsType]?: string}) => {
        return getSingletonRequest(this.url, params);
    }
}
