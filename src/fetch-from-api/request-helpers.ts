import { CreateRequestBuilderProps } from "exprest-shared";
import { GetEntityRequestBuilderProps } from "exprest-shared";
import { DeleteEntityRequestBuilderProps } from "exprest-shared";
import { DeleteSingletonRequestBuilderProps } from "exprest-shared";
import { UpdateEntityRequestBuilderProps } from "exprest-shared";
import { UpdateSingletonRequestBuilderProps } from "exprest-shared";
import { GetCollectionRequestBuilderProps } from "exprest-shared";
import { ActionRequestBuilderProps } from "exprest-shared";

export enum HttpQueryType {
    get = 'GET',
    post = 'POST',
    put =  'PUT',
    delete = 'DELETE'
}
type HttpQueryTypeValues = `${HttpQueryType}`;

export function request({
    url,
    method = HttpQueryType.get,
    body = undefined,
    headers = {},
} : { url: string, method?: HttpQueryType, body?: any, headers?: {[key: string]: string} }): Request {
    if (!Object.values<HttpQueryTypeValues>(HttpQueryType).includes(method)) {
        throw new RangeError(`method parameter must be one of the following: ${Object.values(HttpQueryType).join(', ')}`);
    }

    const requestParams: RequestInit = {
        method: method,
        headers: new Headers({
            ...headers,
            'Content-Type': 'application/json'
        }),
    }
    if (body) {
        requestParams.body = JSON.stringify(body);
    } else {
        if (HttpQueryType.post === method || HttpQueryType.put === method) {
            requestParams.body = JSON.stringify({});
        }
    }
    return new Request(url, requestParams);
}

export function postRequest(
    {url, data, queryParams = {}, headers = {}}
    : {url: string, data?: any, queryParams?: Object, headers?: {[key: string]: string}}
): Request {
    return request({url: buildUrl(url, queryParams), method: HttpQueryType.post, body: data, headers});
}

export function getRequest(
    {url, queryParams, headers}
    : {url: string, queryParams?: Object, headers?: {[key: string]: string}}
): Request {
    return request({url: buildUrl(url, queryParams), headers});
}

export function putRequest(
    {url, data, queryParams = {}, headers = {}}
    : {url: string, data?: any, queryParams?: Object, headers?: {[key: string]: string}}
): Request {
    return request({url: buildUrl(url, queryParams), method: HttpQueryType.put, body: data, headers});
}

export function deleteRequest(
    {url, queryParams = {}, headers = {}}
    : {url: string, queryParams?: Object, headers?: {[key: string]: string}}
): Request {
    return request({url: buildUrl(url, queryParams), method: HttpQueryType.delete, headers});
}

/**
 * Returns a request for an action.
 * 
 * @param resourceUrl Url of the resource.
 * @param actionName Name of the action.
 * @param data Data to send in the request body.
 * @param queryParams Query parameters to be appended to the url.
 * @returns Request object that can be used with fetch.
 */
export function actionRequest(
    { url, data, queryParams = {}, headers = {} } : ActionRequestBuilderProps
): Request {
    return postRequest({url: buildUrl(url, queryParams), data, headers});
}

/**
 * Returns a get request for a collection resource (i.e. a getAll query).
 * 
 * @param resourceUrl Url of the collection resource.
 * @param queryParams Query parameters to be appended to the url.
 * @returns Request object that can be used with fetch.
 */
export function getCollectionRequest(
    { resourceUrl, queryParams = {}, headers = {}} : GetCollectionRequestBuilderProps
): Request {
    return getRequest({url: buildUrl(resourceUrl, queryParams), headers});
}

/**
 * Returns a get request for a singleton resource.
 * 
 * @param resourceUrl Url of the singleton resource.
 * @param queryParams Query parameters to be appended to the url.
 * @returns Request object that can be used with fetch.
 */
export const getSingletonRequest = getCollectionRequest;

/**
 * Returns a create request for a singleton resource or for creating an entity (i.e. a post).
 * 
 * @param resourceUrl Url of the singleton resource.
 * @param data Create data (sent as post body).
 * @returns Request object that can be used with fetch.
 */
export function createRequest(
    { resourceUrl, data, queryParams = {}, headers = {}} : CreateRequestBuilderProps
): Request {
    return postRequest({url: buildUrl(resourceUrl, queryParams), data, headers});
}

/**
 * Returns an update request for a singleton resource (i.e. a put).
 * 
 * @param resourceUrl Url of the singleton resource.
 * @param data Create data (sent as post body).
 * @returns Request object that can be used with fetch.
 */
export function updateSingletonRequest(
    { resourceUrl, data, queryParams = {}, headers = {} } : UpdateSingletonRequestBuilderProps
): Request {
    return putRequest({url: buildUrl(resourceUrl, queryParams), data, headers});
}

/**
 * Returns a get request for an element of a collection.
 * 
 * @param collectionUrl Url of the collection resource.
 * @param id Id of the element to get.
 * @param queryParams Query parameters to be appended to the url.
 * @returns Request object that can be used with fetch.
 */
export function getEntityRequest<ID = number>(
    { collectionUrl, id, queryParams = {}, headers = {} }: GetEntityRequestBuilderProps<ID>
): Request {
    return getRequest({url: buildUrl(`${collectionUrl}/${id}`, queryParams), headers});
}

/**
 * Return an update request for an element of a collection.
 * 
 * @param collectionUrl Url of the collection resource.
 * @param id Id of the element to update.
 * @param data Query parameters to be appended to the url.
 * @param queryParams Request object that can be used with fetch.
 * @returns Request object that can be used with fetch.
 */
export function updateEntityRequest<ID = number>(
    { collectionUrl, id, data, queryParams = {}, headers = {} }: UpdateEntityRequestBuilderProps<ID>
): Request {
    return putRequest({url: buildUrl(`${collectionUrl}/${id}`, queryParams), data, headers});
}

/**
 * Delete an element of a collection.
 * 
 * @param collectionUrl Url of the collection resource.
 * @param id Id of the element to delete.
 * @param queryParams Request object that can be used with fetch.
 * @returns Request object that can be used with fetch.
 */
export function deleteEntityRequest<ID = number>(
    { collectionUrl, id, queryParams = {}, headers = {} }: DeleteEntityRequestBuilderProps<ID>
): Request {
    return deleteRequest({url: buildUrl(`${collectionUrl}/${id}`, queryParams), headers});
}

/**
 * Delete a singleton.
 * 
 * @param resourceUrl Url of the resource.
 * @param queryParams Request object that can be used with fetch.
 * @returns Request object that can be used with fetch.
 */
export function deleteSingletonRequest(
    { resourceUrl, queryParams = {}, headers = {} }: DeleteSingletonRequestBuilderProps
): Request {
    return deleteRequest({url: buildUrl(resourceUrl, queryParams), headers});
}

/**
 * Build a url with query parameters.
 * 
 * @param urlString Base url.
 * @param params Url parameters to append.
 * @returns A url with the options appended as query parameters.
 */
export function buildUrl(urlString: string, params: Object = {}) {
    const url = new URL(urlString);
    for (const [paramName, value] of Object.entries(params)) {
        if (value) {
            url.searchParams.append(paramName, value);
        }
    }
    return url.href;
}
