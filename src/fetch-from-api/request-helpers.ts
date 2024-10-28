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
    body = undefined
} : { url: string, method?: HttpQueryType, body?: any }): Request {
    if (!Object.values<HttpQueryTypeValues>(HttpQueryType).includes(method)) {
        throw new RangeError(`method parameter must be one of the following: ${Object.values(HttpQueryType).join(', ')}`);
    }

    const requestParams: RequestInit = {
        method: method,
        headers: new Headers({
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

export function postRequest({url, data, queryParams = {}} : {url: string, data?: any, queryParams?: Object}): Request {
    return request({url: buildUrl(url, queryParams), method: HttpQueryType.post, body: data});
}

export function getRequest({url, queryParams} : {url: string, queryParams?: Object}): Request {
    return request({url: buildUrl(url, queryParams)});
}

export function putRequest({url, data, queryParams = {}} : {url: string, data?: any, queryParams?: Object}): Request {
    return request({url: buildUrl(url, queryParams), method: HttpQueryType.put, body: data});
}

export function deleteRequest({url, queryParams = {}} : {url: string, queryParams?: Object}): Request {
    return request({url: buildUrl(url, queryParams), method: HttpQueryType.delete});
}

/**
 * Returns a get request for a collection resource (i.e. a getAll query).
 * 
 * @param Url Url of the collection resource.
 * @param queryParams Query parameters to be appended to the url.
 * @returns Request object that can be used with fetch.
 */
export function getCollectionRequest(resourceUrl: string, queryParams: Object = {}) {
    return getRequest({url: buildUrl(resourceUrl, queryParams)});
}

/**
 * Returns a get request for a singleton resource.
 * 
 * @param Url Url of the singleton resource.
 * @param queryParams Query parameters to be appended to the url.
 * @returns Request object that can be used with fetch.
 */
export const getSingletonRequest = getCollectionRequest;

/**
 * Returns a create request for a singleton resource (i.e. a post).
 * 
 * @param resourceUrl Url of the singleton resource.
 * @param data Create data (sent as post body).
 * @returns Request object that can be used with fetch.
 */
export function createSingletonRequest(resourceUrl: string, data: any, queryParams: Object = {}) {
    return postRequest({url: buildUrl(resourceUrl, queryParams), data});
}

/**
 * Returns a create request for an entity in a collection resource (i.e. a post).
 * 
 * @param resourceUrl Url of the collection resource.
 * @param data Create data (sent as post body).
 * @returns Request object that can be used with fetch.
 */
export const createEntityRequest = createSingletonRequest;

/**
 * Returns an update request for a singleton resource (i.e. a put).
 * 
 * @param resourceUrl Url of the singleton resource.
 * @param data Create data (sent as post body).
 * @returns Request object that can be used with fetch.
 */
export function updateSingletonRequest(resourceUrl: string, data: any, queryParams: Object = {}) {
    return putRequest({url: buildUrl(resourceUrl, queryParams), data});
}

/**
 * Returns a get request for an element of a collection.
 * 
 * @param collectionUrl Url of the collection resource.
 * @param id Id of the element to get.
 * @param queryParams Query parameters to be appended to the url.
 * @returns Request object that can be used with fetch.
 */
export function getEntityRequest<ID = number>(collectionUrl: string, id: ID, queryParams: Object = {}) {
    return getRequest({url: buildUrl(`${collectionUrl}/${id}`, queryParams)});
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
export function updateEntityRequest<ID = number>(collectionUrl: string, id: ID, data: Object, queryParams: Object = {}) {
    return putRequest({url: buildUrl(`${collectionUrl}/${id}`, queryParams), data});
}

/**
 * Delete an element of a collection.
 * 
 * @param collectionUrl Url of the collection resource.
 * @param id Id of the element to delete.
 * @param queryParams Request object that can be used with fetch.
 * @returns Request object that can be used with fetch.
 */
export function deleteEntityRequest<ID = number>(collectionUrl: string, id: ID, queryParams: Object = {}) {
    return deleteRequest({url: buildUrl(`${collectionUrl}/${id}`, queryParams)});
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
