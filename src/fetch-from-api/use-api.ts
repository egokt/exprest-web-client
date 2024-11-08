// @ts-check

import { fetchFromApi } from "./fetch-helpers.js";
import { configuration } from "./configuration.js";
import { ApiResponse } from "exprest-shared";

export function useApi(): (request: Request, options?: RequestInit) => Promise<ApiResponse<any>> {
    return async function (request: Request, options?: RequestInit): Promise<ApiResponse<any>> {
        const response = await fetchFromApi(request, options);
        if (response.status === 401) {
            configuration.navigateToLoginPath();
        }
        return response;
    }
}

