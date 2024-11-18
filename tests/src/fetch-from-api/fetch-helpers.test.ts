import { fetchFromApi, fetchFromApiWithAuth } from "../../../src/fetch-from-api/fetch-helpers";

describe("fetchFromApiWithAuth method", () => {
    // fetchFromApi method is a wrapper around fetchFromApiWithAuth method,
    // therefore its tests cover this method as well

    it("should return a response object with isOk false if response status is 401", async () => {
        const request = new Request("http://example.com");
        const response = new Response("{}", {status: 401});
        const fetchSpy = jest.spyOn(globalThis, "fetch").mockResolvedValue(response);
        const setLoggedOutFunction = jest.fn();
        const result = await fetchFromApiWithAuth(setLoggedOutFunction, request);
        expect(result).toEqual({isOk: false, status: 401});
        expect(setLoggedOutFunction).toHaveBeenCalled();
        fetchSpy.mockRestore();
    });
});

describe("fetchFromApi method", () => {
    it("should return a response object with status and isOk properties", async () => {
        const request = new Request("http://example.com");
        const response = new Response("", {status: 200});
        const fetchSpy = jest.spyOn(globalThis, "fetch").mockResolvedValue(response);
        const result = await fetchFromApi(request);
        expect(result).toEqual({isOk: true, status: 200});
        fetchSpy.mockRestore();
    });

    it("should return a response object with data property if response body is not empty", async () => {
        const request = new Request("http://example.com");
        const response = new Response('{"key": "value"}', {status: 200});
        const fetchSpy = jest.spyOn(globalThis, "fetch").mockResolvedValue(response);
        const result = await fetchFromApi(request);
        expect(result).toEqual({isOk: true, status: 200, data: {key: "value"}});
        fetchSpy.mockRestore();
    });

    it("should return a response object with isOk false if response body is not json", async () => {
        const originalError = console.error;
        console.error = jest.fn();

        const request = new Request("http://example.com");
        const response = new Response("not json", {status: 200});
        const fetchSpy = jest.spyOn(globalThis, "fetch").mockResolvedValue(response);
        const result = await fetchFromApi(request);
        expect(result).toEqual({isOk: false});
        fetchSpy.mockRestore();

        console.error = originalError;
    });

    it("should return a response object with isOk false if fetch throws an error", async () => {
        const originalError = console.error;
        console.error = jest.fn();

        const request = new Request("http://example.com");
        const fetchSpy = jest.spyOn(globalThis, "fetch").mockRejectedValue(new Error("error"));
        const result = await fetchFromApi(request);
        expect(result).toEqual({isOk: false});
        fetchSpy.mockRestore();

        console.error = originalError;
    });
});