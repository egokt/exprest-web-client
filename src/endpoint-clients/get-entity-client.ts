import { ApiResponse } from "exprest-shared";
import { EndpointClient } from "./endpoint-client.js";
import { fetchFromApi, fetchFromApiWithAuth } from "../fetch-from-api/fetch-helpers.js";
import { getEntityRequest } from "../fetch-from-api/request-helpers.js";
import { RequestBuilderWithId, RequestBuilderWithIdWithParams } from "../request-types.js";

export class GetEntityClient<ApiReturnType extends Object, ID = number> extends EndpointClient {
    async fetch(id: ID): Promise<ApiResponse<ApiReturnType>> { return fetchFromApi<ApiReturnType>(this.request(id)); }
    request: RequestBuilderWithId<ID> = (id: ID) => { return getEntityRequest<ID>({collectionUrl: this.url, id}); } 
}

export class GetEntityClientWithAuth<ApiReturnType extends Object, ID = number> extends EndpointClient {
    async fetch(setLoggedOutFunction: () => void, id: ID): Promise<ApiResponse<ApiReturnType>> {
        return fetchFromApiWithAuth<ApiReturnType>(setLoggedOutFunction, this.request(id));
    }
    request: RequestBuilderWithId<ID> = (id: ID) => { return getEntityRequest<ID>({collectionUrl: this.url, id}); } 
}

export class GetEntityClientWithParams<
    ApiReturnType extends Object,
    QueryParamsType extends {[key: string]: string},
    ID = number,
> extends EndpointClient {
    async fetch(id: ID, params: {[key in keyof QueryParamsType]?: string}): Promise<ApiResponse<ApiReturnType>> {
        return fetchFromApi<ApiReturnType>(this.request(id, params));
    }

    request: RequestBuilderWithIdWithParams<QueryParamsType, ID> =
        (id: ID, params: {[key in keyof QueryParamsType]?: string}) => {
            return getEntityRequest({collectionUrl: this.url, id, queryParams: params});
        }
}

export class GetEntityClientWithAuthWithParams<
    ApiReturnType extends Object,
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
            return getEntityRequest({collectionUrl: this.url, id, queryParams: params});
        }
}
