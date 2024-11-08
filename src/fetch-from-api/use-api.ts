import { fetchFromApi } from "./fetch-helpers.js";
import { ApiResponse } from "exprest-shared";

export function useApi(
    navigateToLoginPath: () => void
): (request: Request, options?: RequestInit) => Promise<ApiResponse<any>> {
    return async function (request: Request, options?: RequestInit): Promise<ApiResponse<any>> {
        const response = await fetchFromApi(request, options);
        if (response.status === 401) {
            navigateToLoginPath();
        }
        return response;
    }
}

