import { ApiResponse } from "@egokt/exprest-shared";
import { fetchFromApi } from "../fetch-from-api/fetch-helpers.js";
import { EndpointClient } from "./endpoint-client.js";
import { ActionRequest, ActionRequestWithBody } from "../types/request-types.js";
import { postRequest } from "../fetch-from-api/request-helpers.js";

export class ActionEndpointClient<ApiReturnType extends Object | null> extends EndpointClient {
    constructor(param: ConstructorParameters<typeof EndpointClient>[0]) {
        super(param);
    }

    async fetch(): Promise<ApiResponse<ApiReturnType>> {
        return fetchFromApi<ApiReturnType>(this.request());
    }

    request: ActionRequest<null> = () => {
        return postRequest({ url: this.url });
    } 
}

export class ActionEndpointClientWithBody<QueryBodyType extends Object, ApiReturnType extends Object | null> extends EndpointClient {
    constructor(param: ConstructorParameters<typeof EndpointClient>[0]) {
        super(param);
    }

    async fetch(data: QueryBodyType): Promise<ApiResponse<ApiReturnType>> {
        return fetchFromApi<ApiReturnType>(this.request(data));
    }

    request: ActionRequestWithBody<QueryBodyType> = (data: QueryBodyType) => {
        return postRequest({ url: this.url, data });
    } 
}