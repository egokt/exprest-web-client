export { useApi } from "./fetch-from-api/use-api.js";
export { fetchFromApi } from "./fetch-from-api/fetch-helpers.js";
export {
    request,
    postRequest,
    putRequest,
    deleteRequest,
    getRequest,
    getCollectionRequest,
    getSingletonRequest,
    createSingletonRequest,
    updateSingletonRequest,
    getEntityRequest,
    createEntityRequest,
    updateEntityRequest,
    deleteEntityRequest,
    buildUrl,
} from "./fetch-from-api/request-helpers.js";

// This doesn't work with the typescript declerations webpack plugin we are currently using.
// export type {
//     GetRequest,
//     ActionRequest,
//     ActionRequestWithBody,
// } from './types/request-types.js';
import {
    GetRequest as GetRequestType,
    ActionRequest as ActionRequestType,
    ActionRequestWithBody as ActionRequestWithBodyType,
} from './types/request-types.js';
export type GetRequest<PARAMS extends {[key: string]: true} | null = null> = GetRequestType<PARAMS>;
export type ActionRequest<BODY extends Object | null, PARAMS extends {[key: string]: true} | null = null> = ActionRequestType<BODY, PARAMS>;
export type ActionRequestWithBody<BODY extends Object> = ActionRequestWithBodyType<BODY>;

export { ActionEndpointClient } from './endpoint-clients/action-endpoint-client.js';
export { ActionEndpointClientWithBody } from './endpoint-clients/action-endpoint-client.js';
export { GetCollectionEndpointClient } from './endpoint-clients/collection-get-endpoint-client.js';
export { GetSingletonEndpointClient } from './endpoint-clients/singleton-get-endpoint-client.js';
