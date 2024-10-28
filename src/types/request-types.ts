export type GetRequest<
PARAMS extends {[key: string]: true} | null = null> =
    PARAMS extends null
        ? () => Request
        : (params?: {[key in keyof PARAMS]?: string}) => Request;

export type ActionRequest<
BODY extends Object | null,
PARAMS extends {[key: string]: true} | null = null> =
    BODY extends null
        ? (PARAMS extends null
            ? () => Request
            : (params?: {[key in keyof PARAMS]?: string}) => Request)
        : (PARAMS extends null
            ? (data: BODY) => Request
            : (data: BODY, params?: {[key in keyof PARAMS]?: string}) => Request);

export type ActionRequestWithBody<BODY extends Object> = (data: BODY) => Request;
