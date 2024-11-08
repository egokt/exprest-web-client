import { ApiResponse } from "exprest-shared";
import { configuration } from "./configuration.js";

export async function fetchFromApi<T>(request: Request, options?: RequestInit) : Promise<ApiResponse<T>> {
    try {
        const response = await fetch(request, options);
        
        if (response.status === 401) {
            configuration.setLoggedOut();
        }

        // we use the return type of the function
        const retval: ApiResponse<T> = {
            status: response.status,
            isOk: response.ok,
        };

        const responseData = await response.text();
        if (responseData.length > 0) {
            try {
                retval.data = JSON.parse(responseData);
            } catch (err) {
                console.error(`Error: Could not parse api response as json.`);
                return {isOk: false};
            }
        }

        return retval;
    } catch (err) {
        console.error(`Error fetching from API: ${err instanceof Error ? err.stack : err}`);
        return {isOk: false};
    }
}

