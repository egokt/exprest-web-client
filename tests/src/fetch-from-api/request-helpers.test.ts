import { buildUrl, createRequest, deleteEntityRequest, deleteRequest, deleteSingletonRequest, getCollectionRequest, getEntityRequest, getRequest, getSingletonRequest, HttpQueryType, postRequest, putRequest, request, updateEntityRequest, updateSingletonRequest } from "../../../src/fetch-from-api/request-helpers";

describe("request method", () => {
    it("should return a request object with just the url", () => {
        const requestVal = request({ url: "http://example.com.local" });
        expect(requestVal.method).toBe(HttpQueryType.get);
        expect(requestVal.body).toBeNull();
    });

    it("should return an empty object body if not provided with put", async () => {
        const requestVal = request({ url: "http://example.com.local", method: HttpQueryType.put });
        expect(requestVal.body).toBeDefined();
        if (requestVal.body) {
            expect(JSON.parse((await streamToString(requestVal.body)))).toStrictEqual({});
        }
    });

    it("should return an empty object body if not provided with post", async () => {
        const requestVal = request({ url: "http://example.com.local", method: HttpQueryType.post });
        expect(requestVal.body).toBeDefined();
        if (requestVal.body) {
            expect(JSON.parse((await streamToString(requestVal.body)))).toStrictEqual({});
        }
    });

    it("should return a request object with a body if provided with put", async () => {
        const requestVal = request({ url: "http://example.com.local", method: HttpQueryType.put, body: { a: 1 } });
        expect(requestVal.body).toBeDefined();
        if (requestVal.body) {
            expect(JSON.parse((await streamToString(requestVal.body)))).toStrictEqual({ a: 1 });
        }
    });

    it("should return a request object with a body if provided with post", async () => {
        const requestVal = request({ url: "http://example.com.local", method: HttpQueryType.post, body: { a: 1 } });
        expect(requestVal.body).toBeDefined();
        if (requestVal.body) {
            expect(JSON.parse((await streamToString(requestVal.body)))).toStrictEqual({ a: 1 });
        }
    });
});

describe("buildUrl method", () => {
    it("should return the url with added / if no query params are provided", () => {
        const url = "http://example.com.local";
        expect(buildUrl(url)).toBe(`${url}/`);
    });

    it("should return the url if no query params are provided", () => {
        const url = "http://example.com.local/";
        expect(buildUrl(url)).toBe(url);
    });

    it("should return the url with query params if provided", () => {
        const url = "http://example.com.local";
        const queryParams = { a: 1, b: 2 };
        expect(buildUrl(url, queryParams)).toBe(`${url}/?a=1&b=2`);
    });
});

describe("getRequest method", () => {
    it("should return a request object with the url and get method", () => {
        const requestVal = getRequest({ url: "http://example.com.local" });
        expect(requestVal.method).toBe(HttpQueryType.get);
    });

    it("should return a request object with the url and query params", () => {
        const requestVal = getRequest({ url: "http://example.com.local", queryParams: { a: 1, b: 2 } });
        expect(requestVal.url).toBe("http://example.com.local/?a=1&b=2");
    });
});

describe("postRequest method", () => {
    it("should return a request object with the url and post method", () => {
        const requestVal = postRequest({ url: "http://example.com.local" });
        expect(requestVal.url).toBe("http://example.com.local/");
        expect(requestVal.method).toBe(HttpQueryType.post);
    });

    it("should return a request object with the url and query params", () => {
        const requestVal = postRequest({ url: "http://example.com.local", queryParams: { a: 1, b: 2 } });
        expect(requestVal.url).toBe("http://example.com.local/?a=1&b=2");
    });

    it("should return a request object with the url and data", async () => {
        const requestVal = postRequest({ url: "http://example.com.local", data: { a: 1 } });
        expect(requestVal.body).toBeDefined();
        if (requestVal.body) {
            expect(JSON.parse((await streamToString(requestVal.body)))).toStrictEqual({ a: 1 });
        }
    });
});

describe("putRequest method", () => {
    it("should return a request object with the url and put method", () => {
        const requestVal = putRequest({ url: "http://example.com.local" });
        expect(requestVal.url).toBe("http://example.com.local/");
        expect(requestVal.method).toBe(HttpQueryType.put);
    });

    it("should return a request object with the url and query params", () => {
        const requestVal = putRequest({ url: "http://example.com.local", queryParams: { a: 1, b: 2 } });
        expect(requestVal.url).toBe("http://example.com.local/?a=1&b=2");
    });

    it("should return a request object with the url and data", async () => {
        const requestVal = putRequest({ url: "http://example.com.local", data: { a: 1 } });
        expect(requestVal.body).toBeDefined();
        if (requestVal.body) {
            expect(JSON.parse((await streamToString(requestVal.body)))).toStrictEqual({ a: 1 });
        }
    });
});

describe("deleteRequest method", () => {
    it("should return a request object with the url and delete method", () => {
        const requestVal = deleteRequest({ url: "http://example.com.local" });
        expect(requestVal.url).toBe("http://example.com.local/");
        expect(requestVal.method).toBe(HttpQueryType.delete);
    });

    it("should return a request object with the url and query params", () => {
        const requestVal = deleteRequest({ url: "http://example.com.local", queryParams: { a: 1, b: 2 } });
        expect(requestVal.url).toBe("http://example.com.local/?a=1&b=2");
    });
});

describe("getCollectionRequest method", () => {
    it("should return a request object with the url and get method", () => {
        const requestVal = getCollectionRequest("http://example.com.local");
        expect(requestVal.url).toBe("http://example.com.local/");
        expect(requestVal.method).toBe(HttpQueryType.get);
    });

    it("should return a request object with the url and query params", () => {
        const requestVal = getCollectionRequest("http://example.com.local", { a: 1, b: 2 });
        expect(requestVal.url).toBe("http://example.com.local/?a=1&b=2");
    });
});

describe("getSingletonRequest method", () => {
    it("should return a request object with the url and get method", () => {
        const requestVal = getSingletonRequest("http://example.com.local");
        expect(requestVal.url).toBe("http://example.com.local/");
        expect(requestVal.method).toBe(HttpQueryType.get);
    });

    it("should return a request object with the url and query params", () => {
        const requestVal = getSingletonRequest("http://example.com.local", { a: 1, b: 2 });
        expect(requestVal.url).toBe("http://example.com.local/?a=1&b=2");
    });
});

describe("getEntityRequest method", () => {
    it("should return a request object with the url and get method", () => {
        const requestVal = getEntityRequest("http://example.com.local", 1);
        expect(requestVal.url).toBe("http://example.com.local/1");
        expect(requestVal.method).toBe(HttpQueryType.get);
    });

    it("should return a request object with the url and query params", () => {
        const requestVal = getEntityRequest("http://example.com.local", 1, { a: 1, b: 2 });
        expect(requestVal.url).toBe("http://example.com.local/1?a=1&b=2");
    });
});

describe("createRequest method", () => {
    it("should return a request object with the url and post method", () => {
        const requestVal = createRequest("http://example.com.local", { a: 1 });
        expect(requestVal.url).toBe("http://example.com.local/");
        expect(requestVal.method).toBe(HttpQueryType.post);
    });

    it("should return a request object with the url and query params", () => {
        const requestVal = createRequest("http://example.com.local", { a: 1 }, { b: 2 });
        expect(requestVal.url).toBe("http://example.com.local/?b=2");
    });

    it("should return a request object with the url and data", async () => {
        const requestVal = createRequest("http://example.com.local", { a: 1 });
        expect(requestVal.body).toBeDefined();
        if (requestVal.body) {
            expect(JSON.parse((await streamToString(requestVal.body)))).toStrictEqual({ a: 1 });
        }
    });
});

describe("updateSingletonRequest method", () => {
    it("should return a request object with the url and put method", () => {
        const requestVal = updateSingletonRequest("http://example.com.local", { a: 1 });
        expect(requestVal.url).toBe("http://example.com.local/");
        expect(requestVal.method).toBe(HttpQueryType.put);
    });

    it("should return a request object with the url and query params", () => {
        const requestVal = updateSingletonRequest("http://example.com.local", { a: 1 }, { b: 2 });
        expect(requestVal.url).toBe("http://example.com.local/?b=2");
    });

    it("should return a request object with the url and data", async () => {
        const requestVal = updateSingletonRequest("http://example.com.local", { a: 1 });
        expect(requestVal.body).toBeDefined();
        if (requestVal.body) {
            expect(JSON.parse((await streamToString(requestVal.body)))).toStrictEqual({ a: 1 });
        }
    });
});

describe("updateEntityRequest method", () => {
    it("should return a request object with the url and put method", () => {
        const requestVal = updateEntityRequest("http://example.com.local", 1, { a: 1 });
        expect(requestVal.url).toBe("http://example.com.local/1");
        expect(requestVal.method).toBe(HttpQueryType.put);
    });

    it("should return a request object with the url and query params", () => {
        const requestVal = updateEntityRequest("http://example.com.local", 1, { a: 1 }, { b: 2 });
        expect(requestVal.url).toBe("http://example.com.local/1?b=2");
    });

    it("should return a request object with the url and data", async () => {
        const requestVal = updateEntityRequest("http://example.com.local", 1, { a: 1 });
        expect(requestVal.body).toBeDefined();
        if (requestVal.body) {
            expect(JSON.parse((await streamToString(requestVal.body)))).toStrictEqual({ a: 1 });
        }
    });
});

describe("deleteSingletonRequest method", () => {
    it("should return a request object with the url and delete method", () => {
        const requestVal = deleteSingletonRequest("http://example.com.local");
        expect(requestVal.url).toBe("http://example.com.local/");
        expect(requestVal.method).toBe(HttpQueryType.delete);
    });

    it("should return a request object with the url and query params", () => {
        const requestVal = deleteSingletonRequest("http://example.com.local", { a: 1, b: 2 });
        expect(requestVal.url).toBe("http://example.com.local/?a=1&b=2");
    });
});

describe("deleteEntityRequest method", () => {
    it("should return a request object with the url and delete method", () => {
        const requestVal = deleteEntityRequest("http://example.com.local", 1);
        expect(requestVal.url).toBe("http://example.com.local/1");
        expect(requestVal.method).toBe(HttpQueryType.delete);
    });

    it("should return a request object with the url and query params", () => {
        const requestVal = deleteEntityRequest("http://example.com.local", 1, { a: 1, b: 2 });
        expect(requestVal.url).toBe("http://example.com.local/1?a=1&b=2");
    });
});

async function streamToString(stream: ReadableStream): Promise<string> {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let result = '';
  let done = false;

  while (!done) {
    const { value, done: doneReading } = await reader.read();
    done = doneReading;
    if (value) {
      result += decoder.decode(value, { stream: !done });
    }
  }

  return result;
}