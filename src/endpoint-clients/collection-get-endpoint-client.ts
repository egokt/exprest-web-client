import { ApiResponse } from "@egokt/exprest-shared";
import { EndpointClient } from "./endpoint-client.js";
import { GetRequest } from "../types/request-types.js";
import { fetchFromApi } from "../fetch-from-api/fetch-helpers.js";
import { getRequest } from "../fetch-from-api/request-helpers.js";

export class GetCollectionEndpointClient<ApiReturnType extends Object> extends EndpointClient {
    constructor(param: ConstructorParameters<typeof EndpointClient>[0]) {
        super(param);
    }

    async fetch(): Promise<ApiResponse<ApiReturnType>> {
        return fetchFromApi<ApiReturnType>(this.request());
    }

    request: GetRequest<null> = () => {
        return getRequest({ url: this.url });
    } 
}
