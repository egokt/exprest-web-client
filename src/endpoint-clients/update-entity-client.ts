import { ApiResponse } from "exprest-shared";
import { fetchFromApi, fetchFromApiWithAuth } from "../fetch-from-api/fetch-helpers.js";
import { EndpointClient } from "./endpoint-client.js";
import {
    RequestBuilderWithId,
    RequestBuilderWithIdWithBody,
    RequestBuilderWithIdWithBodyWithParams,
    RequestBuilderWithIdWithParams,
} from "../request-types.js";
import { updateEntityRequest } from "../fetch-from-api/request-helpers.js";

export class UpdateEntityClient<ApiReturnType extends Object | null, ID = number> extends EndpointClient {
    async fetch(id: ID): Promise<ApiResponse<ApiReturnType>> { return fetchFromApi<ApiReturnType>(this.request(id)); }
    request: RequestBuilderWithId<ID> = (id: ID) => {
        return updateEntityRequest({collectionUrl: this.url, id, data: {}});
    } 
}

export class UpdateEntityClientWithAuth<ApiReturnType extends Object | null, ID = number> extends EndpointClient {
    async fetch(setLoggedOutFunction: () => void, id: ID): Promise<ApiResponse<ApiReturnType>> {
        return fetchFromApiWithAuth<ApiReturnType>(setLoggedOutFunction, this.request(id));
    }
    request: RequestBuilderWithId<ID> = (id: ID) => {
        return updateEntityRequest({collectionUrl: this.url, id, data: {}});
    } 
}

export class UpdateEntityClientWithParams<
    ApiReturnType extends Object | null,
    QueryParamsType extends {[key: string]: string},
    ID = number,
> extends EndpointClient {
    async fetch(id: ID, params: {[key in keyof QueryParamsType]?: string}): Promise<ApiResponse<ApiReturnType>> {
        return fetchFromApi<ApiReturnType>(this.request(id, params));
    }

    request: RequestBuilderWithIdWithParams<QueryParamsType, ID> =
        (id: ID, params: {[key in keyof QueryParamsType]?: string}) => {
            return updateEntityRequest({collectionUrl: this.url, id, data: {}, queryParams: params});
        }
}

export class UpdateEntityClientWithAuthWithParams<
    ApiReturnType extends Object | null,
    QueryParamsType extends {[key: string]: string},
    ID = number,
> extends EndpointClient {
    async fetch(
        setLoggedOutFunction: () => void,
        id: ID,
        params: {[key in keyof QueryParamsType]?: string}
    ): Promise<ApiResponse<ApiReturnType>> {
        return fetchFromApiWithAuth<ApiReturnType>(setLoggedOutFunction, this.request(id, params));
    }

    request: RequestBuilderWithIdWithParams<QueryParamsType, ID> =
        (id: ID, params: {[key in keyof QueryParamsType]?: string}) => {
            return updateEntityRequest({collectionUrl: this.url, id, data: {}, queryParams: params});
        }
}

export class UpdateEntityClientWithBody<
    ApiReturnType extends Object | null,
    QueryBodyType extends Object,
    ID = number,
> extends EndpointClient {
    async fetch(id: ID, data: QueryBodyType): Promise<ApiResponse<ApiReturnType>> {
        return fetchFromApi<ApiReturnType>(this.request(id, data));
    }

    request: RequestBuilderWithIdWithBody<QueryBodyType, ID> = (id: ID, data: QueryBodyType) => {
        return updateEntityRequest({collectionUrl: this.url, id, data});
    } 
}

export class UpdateEntityClientWithAuthWithBody<
    ApiReturnType extends Object | null,
    QueryBodyType extends Object,
    ID = number,
> extends EndpointClient {
    async fetch(
        setLoggedOutFunction: () => void,
        id: ID,
        data: QueryBodyType
    ): Promise<ApiResponse<ApiReturnType>> {
        return fetchFromApiWithAuth<ApiReturnType>(setLoggedOutFunction, this.request(id, data));
    }

    request: RequestBuilderWithIdWithBody<QueryBodyType, ID> = (id: ID, data: QueryBodyType) => {
        return updateEntityRequest({collectionUrl: this.url, id, data});
    } 
}

export class UpdateEntityClientWithBodyWithParams<
    ApiReturnType extends Object | null,
    QueryParamsType extends {[key: string]: string},
    QueryBodyType extends Object,
    ID = number,
> extends EndpointClient {
    async fetch(id: ID, params: QueryParamsType, data: QueryBodyType): Promise<ApiResponse<ApiReturnType>> {
        return fetchFromApi<ApiReturnType>(this.request(id, params, data));
    }

    request: RequestBuilderWithIdWithBodyWithParams<QueryParamsType, QueryBodyType, ID> =
        (id: ID, params: {[key in keyof QueryParamsType]?: string}, data: QueryBodyType) => {
            return updateEntityRequest({collectionUrl: this.url, id, data, queryParams: params});
        } 
}

export class UpdateEntityClientWithAuthWithBodyWithParams<
    ApiReturnType extends Object | null,
    QueryParamsType extends {[key: string]: string},
    QueryBodyType extends Object,
    ID = number,
> extends EndpointClient {
    async fetch(
        setLoggedOutFunction: () => void,
        id: ID,
        params: QueryParamsType,
        data: QueryBodyType
    ): Promise<ApiResponse<ApiReturnType>> {
        return fetchFromApiWithAuth<ApiReturnType>(setLoggedOutFunction, this.request(id, params, data));
    }

    request: RequestBuilderWithIdWithBodyWithParams<QueryParamsType, QueryBodyType, ID> =
        (id: ID, params: {[key in keyof QueryParamsType]?: string}, data: QueryBodyType) => {
            return updateEntityRequest({collectionUrl: this.url, id, data, queryParams: params});
        } 
}
