export type RequestBuilder = () => Request;
export type RequestBuilderWithId<ID> = (id: ID) => Request;
export type RequestBuilderWithParams<PARAMS extends {[key: string]: string}> =
    (params: {[key in keyof PARAMS]?: string}) => Request;
export type RequestBuilderWithIdWithParams<PARAMS extends {[key: string]: string}, ID = number> =
    (id: ID, params: {[key in keyof PARAMS]?: string}) => Request;
export type RequestBuilderWithBody<BODY extends Object> = (data: BODY) => Request;
export type RequestBuilderWithIdWithBody<BODY extends Object, ID = number> = (id: ID, data: BODY) => Request;
export type RequestBuilderWithBodyWithParams<PARAMS extends {[key: string]: string}, BODY extends Object> =
    (params: {[key in keyof PARAMS]?: string}, data: BODY) => Request;
export type RequestBuilderWithIdWithBodyWithParams<
    PARAMS extends {[key: string]: string},
    BODY extends Object,
    ID = number
> = (id: ID, params: {[key in keyof PARAMS]?: string}, data: BODY) => Request;
