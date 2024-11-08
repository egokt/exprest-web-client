import { ApiResponse } from "exprest-shared";
import { fetchFromApi, fetchFromApiWithAuth } from "../fetch-from-api/fetch-helpers.js";
import { EndpointClient } from "./endpoint-client.js";
import {
    RequestBuilder,
    RequestBuilderWithBody,
    RequestBuilderWithBodyWithParams,
    RequestBuilderWithParams
} from "../request-types.js";
import { createRequest } from "../fetch-from-api/request-helpers.js";

export class CreateClient<ApiReturnType extends Object | null> extends EndpointClient {
    async fetch(): Promise<ApiResponse<ApiReturnType>> { return fetchFromApi<ApiReturnType>(this.request()); }
    request: RequestBuilder = () => { return createRequest(this.url, {}); } 
}

export class CreateClientWithAuth<ApiReturnType extends Object | null> extends EndpointClient {
    async fetch(setLoggedOutFunction: () => void): Promise<ApiResponse<ApiReturnType>> {
        return fetchFromApiWithAuth<ApiReturnType>(setLoggedOutFunction, this.request());
    }
    request: RequestBuilder = () => { return createRequest(this.url, {}); } 
}

export class CreateClientWithParams<
    ApiReturnType extends Object | null,
    QueryParamsType extends {[key: string]: string},
> extends EndpointClient {
    async fetch(params: {[key in keyof QueryParamsType]?: string}): Promise<ApiResponse<ApiReturnType>> {
        return fetchFromApi<ApiReturnType>(this.request(params));
    }

    request: RequestBuilderWithParams<QueryParamsType> = (params: {[key in keyof QueryParamsType]?: string}) => {
        return createRequest(this.url, {}, params);
    } 
}

export class CreateClientWithAuthWithParams<
    ApiReturnType extends Object | null,
    QueryParamsType extends {[key: string]: string},
> extends EndpointClient {
    async fetch(
        setLoggedOutFunction: () => void,
        params: {[key in keyof QueryParamsType]?: string}
    ): Promise<ApiResponse<ApiReturnType>> {
        return fetchFromApiWithAuth<ApiReturnType>(setLoggedOutFunction, this.request(params));
    }

    request: RequestBuilderWithParams<QueryParamsType> = (params: {[key in keyof QueryParamsType]?: string}) => {
        return createRequest(this.url, {}, params);
    } 
}


export class CreateClientWithBody<
    ApiReturnType extends Object | null,
    QueryBodyType extends Object,
> extends EndpointClient {
    async fetch(data: QueryBodyType): Promise<ApiResponse<ApiReturnType>> {
        return fetchFromApi<ApiReturnType>(this.request(data));
    }

    request: RequestBuilderWithBody<QueryBodyType> = (data: QueryBodyType) => { return createRequest(this.url, data); } 
}

export class CreateClientWithAuthWithBody<
    ApiReturnType extends Object | null,
    QueryBodyType extends Object,
> extends EndpointClient {
    async fetch(
        setLoggedOutFunction: () => void,
        data: QueryBodyType
    ): Promise<ApiResponse<ApiReturnType>> {
        return fetchFromApiWithAuth<ApiReturnType>(setLoggedOutFunction, this.request(data));
    }

    request: RequestBuilderWithBody<QueryBodyType> = (data: QueryBodyType) => { return createRequest(this.url, data); } 
}

export class CreateClientWithBodyWithParams<
    ApiReturnType extends Object | null,
    QueryParamsType extends {[key: string]: string},
    QueryBodyType extends Object,
> extends EndpointClient {
    async fetch(params: QueryParamsType, data: QueryBodyType): Promise<ApiResponse<ApiReturnType>> {
        return fetchFromApi<ApiReturnType>(this.request(params, data));
    }

    request: RequestBuilderWithBodyWithParams<QueryParamsType, QueryBodyType> =
        (params: {[key in keyof QueryParamsType]?: string}, data: QueryBodyType) => {
            return createRequest(this.url, data, params);
        } 
}

export class CreateClientWithAuthWithBodyWithParams<
    ApiReturnType extends Object | null,
    QueryParamsType extends {[key: string]: string},
    QueryBodyType extends Object,
> extends EndpointClient {
    async fetch(
        setLoggedOutFunction: () => void,
        params: QueryParamsType,
        data: QueryBodyType
    ): Promise<ApiResponse<ApiReturnType>> {
        return fetchFromApiWithAuth<ApiReturnType>(setLoggedOutFunction, this.request(params, data));
    }

    request: RequestBuilderWithBodyWithParams<QueryParamsType, QueryBodyType> =
        (params: {[key in keyof QueryParamsType]?: string}, data: QueryBodyType) => {
            return createRequest(this.url, data, params);
        } 
}
