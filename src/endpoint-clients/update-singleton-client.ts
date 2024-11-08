import { ApiResponse } from "exprest-shared";
import { fetchFromApi, fetchFromApiWithAuth } from "../fetch-from-api/fetch-helpers.js";
import { EndpointClient } from "./endpoint-client.js";
import {
    RequestBuilder,
    RequestBuilderWithBody,
    RequestBuilderWithBodyWithParams,
    RequestBuilderWithParams
} from "../request-types.js";
import { updateSingletonRequest } from "../fetch-from-api/request-helpers.js";

export class UpdateSingletonClient<ApiReturnType extends Object | null> extends EndpointClient {
    async fetch(): Promise<ApiResponse<ApiReturnType>> { return fetchFromApi<ApiReturnType>(this.request()); }
    request: RequestBuilder = () => { return updateSingletonRequest(this.url, {}); } 
}

export class UpdateSingletonClientWithAuth<ApiReturnType extends Object | null> extends EndpointClient {
    async fetch(setLoggedOutFunction: () => void): Promise<ApiResponse<ApiReturnType>> {
        return fetchFromApiWithAuth<ApiReturnType>(setLoggedOutFunction, this.request());
    }
    request: RequestBuilder = () => { return updateSingletonRequest(this.url, {}); } 
}

export class UpdateSingletonClientWithParams<
    ApiReturnType extends Object | null,
    QueryParamsType extends {[key: string]: string},
> extends EndpointClient {
    async fetch(params: {[key in keyof QueryParamsType]?: string}): Promise<ApiResponse<ApiReturnType>> {
        return fetchFromApi<ApiReturnType>(this.request(params));
    }

    request: RequestBuilderWithParams<QueryParamsType> = (params: {[key in keyof QueryParamsType]?: string}) => {
        return updateSingletonRequest(this.url, {}, params);
    } 
}

export class UpdateSingletonClientWithAuthWithParams<
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
        return updateSingletonRequest(this.url, {}, params);
    } 
}

export class UpdateSingletonClientWithBody<
    ApiReturnType extends Object | null,
    QueryBodyType extends Object,
> extends EndpointClient {
    async fetch(data: QueryBodyType): Promise<ApiResponse<ApiReturnType>> {
        return fetchFromApi<ApiReturnType>(this.request(data));
    }

    request: RequestBuilderWithBody<QueryBodyType> = (data: QueryBodyType) => {
        return updateSingletonRequest(this.url, data);
    } 
}

export class UpdateSingletonClientWithAuthWithBody<
    ApiReturnType extends Object | null,
    QueryBodyType extends Object,
> extends EndpointClient {
    async fetch(setLoggedOutFunction: () => void, data: QueryBodyType): Promise<ApiResponse<ApiReturnType>> {
        return fetchFromApiWithAuth<ApiReturnType>(setLoggedOutFunction, this.request(data));
    }

    request: RequestBuilderWithBody<QueryBodyType> = (data: QueryBodyType) => {
        return updateSingletonRequest(this.url, data);
    } 
}

export class UpdateSingletonClientWithBodyWithParams<
    ApiReturnType extends Object | null,
    QueryParamsType extends {[key: string]: string},
    QueryBodyType extends Object,
> extends EndpointClient {
    async fetch(params: QueryParamsType, data: QueryBodyType): Promise<ApiResponse<ApiReturnType>> {
        return fetchFromApi<ApiReturnType>(this.request(params, data));
    }

    request: RequestBuilderWithBodyWithParams<QueryParamsType, QueryBodyType> =
        (params: {[key in keyof QueryParamsType]?: string}, data: QueryBodyType) => {
            return updateSingletonRequest(this.url, data, params);
        } 
}

export class UpdateSingletonClientWithAuthWithBodyWithParams<
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
            return updateSingletonRequest(this.url, data, params);
        } 
}
