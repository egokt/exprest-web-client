import { ApiResponse } from "exprest-shared";
import { fetchFromApi, fetchFromApiWithAuth } from "../fetch-from-api/fetch-helpers.js";
import { EndpointClient } from "./endpoint-client.js";
import {
    RequestBuilder,
    RequestBuilderWithBody,
    RequestBuilderWithBodyWithParams,
    RequestBuilderWithParams
} from "../request-types.js";
import { postRequest } from "../fetch-from-api/request-helpers.js";

export class ActionClient<ApiReturnType extends Object | null> extends EndpointClient {
    async fetch(): Promise<ApiResponse<ApiReturnType>> { return fetchFromApi<ApiReturnType>(this.request()); }
    request: RequestBuilder = () => { return postRequest({ url: this.url }); } 
}

export class ActionClientWithAuth<ApiReturnType extends Object | null> extends EndpointClient {
    async fetch(setLoggedOutFunction: () => void): Promise<ApiResponse<ApiReturnType>> {
        return fetchFromApiWithAuth<ApiReturnType>(setLoggedOutFunction, this.request());
    }
    request: RequestBuilder = () => { return postRequest({ url: this.url }); } 
}

export class ActionClientWithParams<
    ApiReturnType extends Object | null,
    QueryParamsType extends {[key: string]: string},
> extends EndpointClient {
    async fetch(params: {[key in keyof QueryParamsType]?: string}): Promise<ApiResponse<ApiReturnType>> {
        return fetchFromApi<ApiReturnType>(this.request(params));
    }

    request: RequestBuilderWithParams<QueryParamsType> = (params: {[key in keyof QueryParamsType]?: string}) => {
        return postRequest({ url: this.url, queryParams: params });
    } 
}

export class ActionClientWithAuthWithParams<
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
        return postRequest({ url: this.url, queryParams: params });
    } 
}

export class ActionClientWithBody<
    ApiReturnType extends Object | null,
    QueryBodyType extends Object,
> extends EndpointClient {
    async fetch(data: QueryBodyType): Promise<ApiResponse<ApiReturnType>> {
        return fetchFromApi<ApiReturnType>(this.request(data));
    }

    request: RequestBuilderWithBody<QueryBodyType> = (data: QueryBodyType) => {
        return postRequest({ url: this.url, data });
    } 
}

export class ActionClientWithAuthWithBody<
    ApiReturnType extends Object | null,
    QueryBodyType extends Object,
> extends EndpointClient {
    async fetch(
        setLoggedOutFunction: () => void,
        data: QueryBodyType
    ): Promise<ApiResponse<ApiReturnType>> {
        return fetchFromApiWithAuth<ApiReturnType>(setLoggedOutFunction, this.request(data));
    }

    request: RequestBuilderWithBody<QueryBodyType> = (data: QueryBodyType) => {
        return postRequest({ url: this.url, data });
    } 
}


export class ActionClientWithBodyWithParams<
    ApiReturnType extends Object | null,
    QueryParamsType extends {[key: string]: string},
    QueryBodyType extends Object,
> extends EndpointClient {
    async fetch(params: QueryParamsType, data: QueryBodyType): Promise<ApiResponse<ApiReturnType>> {
        return fetchFromApi<ApiReturnType>(this.request(params, data));
    }

    request: RequestBuilderWithBodyWithParams<QueryParamsType, QueryBodyType> =
        (params: {[key in keyof QueryParamsType]?: string}, data: QueryBodyType) => {
            return postRequest({ url: this.url, data, queryParams: params });
        } 
}

export class ActionClientWithAuthWithBodyWithParams<
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
            return postRequest({ url: this.url, data, queryParams: params });
        } 
}
