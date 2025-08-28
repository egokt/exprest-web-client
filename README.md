# Exprest Web Client

Exprest Web Client is a TypeScript library that provides type-safe HTTP client functionality for consuming APIs built with `exprest-server`. It offers structured endpoint clients, request builders, and authentication handling that align perfectly with Exprest's standardized response format.

## Design Philosophy

Exprest Web Client follows the same **separation of concerns** principle as the server framework. Client functionality is broken down into discrete, composable classes and functions that mirror the server-side endpoint structure. This ensures:

- **Type safety**: Full TypeScript support with compile-time guarantees between client and server
- **Consistent interface**: Client classes directly correspond to server endpoint types
- **Authentication handling**: Built-in support for authentication workflows and automatic logout handling
- **Error handling**: Standardized error responses and network failure handling
- **Request flexibility**: Support for headers, query parameters, and request bodies

## Package Structure

- **exprest-web-client** (this package): Type-safe client library for consuming exprest APIs
- **exprest-server**: API endpoint factories and utilities
- **exprest-shared**: Common types and interfaces shared between client and server

## Core Concepts

### Endpoint Clients

Endpoint clients provide a structured way to interact with specific API endpoints. Each client type corresponds to a server-side endpoint pattern:

**Entity-focused clients:**

- `GetEntityClient` - GET `/resource/:id` - Retrieve a specific entity
- `UpdateEntityClient` - PUT `/resource/:id` - Update a specific entity
- `DeleteEntityClient` - DELETE `/resource/:id` - Remove a specific entity

**Collection-focused clients:**

- `GetCollectionClient` - GET `/resource` - Retrieve multiple entities

**Singleton-focused clients:**

- `GetSingletonClient` - GET `/resource` - Retrieve the singleton entity
- `UpdateSingletonClient` - PUT `/resource` - Update the singleton entity
- `DeleteSingletonClient` - DELETE `/resource` - Remove the singleton entity

**Universal clients:**

- `CreateClient` - POST `/resource` - Create a new entity
- `ActionClient` - POST `/resource/action-name` - Custom operations

### Authentication Support

Each client type comes in multiple variants to handle different authentication and parameter scenarios:

- **Base clients** - No authentication, no additional parameters
- **`*WithAuth`** - Requires authentication, handles automatic logout on 401
- **`*WithParams`** - Supports query parameters
- **`*WithBody`** - Supports request body data
- **Combined variants** - e.g., `*WithAuthWithBodyWithParams`

### Response Format

All clients return standardized `ApiResponse<T>` objects:

```typescript
type ApiResponse<T> = {
  status?: number;
  isOk: boolean;
  data?: T;
};
```

The `data` property contains the server response, which follows Exprest's standard format:

```typescript
// Entity responses
{ entity: T }
{ entity: T, other_data: U }

// Collection responses
{ collection: Array<T> }
{ collection: Array<T>, other_data: U }

// Action responses
{ actionResult: T }

// Error responses
{ errors: Array<string> }
```

## Quick Start

### Installation

```bash
npm install exprest-web-client exprest-shared
```

### Basic Example

```typescript
import { GetEntityClient } from "exprest-web-client";

// Define your response type (should match server-side type)
type UserResponse = { id: number; name: string };

// Create client
const userClient = new GetEntityClient<UserResponse>("/api/users");

// Fetch user
const response = await userClient.fetch(123);

if (response.isOk && response.data) {
  const user = response.data.entity; // Typed as UserResponse
  console.log(`User: ${user.name}`);
} else {
  console.error("Failed to fetch user");
}
```

## Client Classes

### Basic Usage Examples

**Get Entity with Parameters:**

```typescript
import { GetEntityClientWithParams } from "exprest-web-client";

type UserResponse = { id: number; name: string };
type UserParams = { include: string };

const client = new GetEntityClientWithParams<UserResponse, UserParams>(
  "/api/users"
);
const response = await client.fetch(123, { include: "profile" });
```

**Create Entity:**

```typescript
import { CreateClientWithBody } from "exprest-web-client";

type UserResponse = { id: number; name: string };
type CreateUserRequest = { name: string; email: string };

const client = new CreateClientWithBody<UserResponse, CreateUserRequest>(
  "/api/users"
);
const response = await client.fetch({
  name: "John",
  email: "john@example.com",
});
```

**Action with Authentication:**

```typescript
import { ActionClientWithAuthWithBody } from "exprest-web-client";

type MakeAdminResult = { success: boolean; message: string };
type MakeAdminRequest = { userId: number };

const client = new ActionClientWithAuthWithBody<
  MakeAdminResult,
  MakeAdminRequest
>("/api/users/make-admin");

const setLoggedOut = () => {
  // Handle logout (redirect to login, clear tokens, etc.)
  window.location.href = "/login";
};

const response = await client.fetch(setLoggedOut, { userId: 123 });
```

### Authentication Handling

Authentication clients require a `setLoggedOutFunction` callback that will be invoked if the server returns a 401 Unauthorized response:

```typescript
import { GetEntityClientWithAuth } from "exprest-web-client";

const client = new GetEntityClientWithAuth<UserResponse>("/api/users");

const handleLogout = () => {
  localStorage.removeItem("authToken");
  window.location.href = "/login";
};

const response = await client.fetch(handleLogout, 123);
```

### Collection Operations

```typescript
import { GetCollectionClientWithParams } from "exprest-web-client";

type UserResponse = { id: number; name: string };
type UserFilters = { status: string; limit: string };

const client = new GetCollectionClientWithParams<UserResponse, UserFilters>(
  "/api/users"
);
const response = await client.fetch({ status: "active", limit: "10" });

if (response.isOk && response.data) {
  const users = response.data.collection; // Array<UserResponse>
  console.log(`Found ${users.length} users`);
}
```

## Low-Level API

### Request Helpers

For more control, you can use the request helper functions directly:

```typescript
import {
  getEntityRequest,
  createRequest,
  updateEntityRequest,
  deleteEntityRequest,
  actionRequest,
  fetchFromApi,
} from "exprest-web-client";

// Build requests manually
const getUserRequest = getEntityRequest({
  collectionUrl: "/api/users",
  id: 123,
});
const createUserRequest = createRequest({
  resourceUrl: "/api/users",
  data: { name: "John", email: "john@example.com" },
});

// Execute requests
const userResponse = await fetchFromApi(getUserRequest);
const createResponse = await fetchFromApi(createUserRequest);
```

### URL Building

```typescript
import { buildUrl } from "exprest-web-client";

const url = buildUrl("/api/users", { status: "active", limit: "10" });
// Result: "/api/users?status=active&limit=10"
```

### Custom Fetch Integration

For frameworks like React or Vue, you can integrate with existing authentication systems:

```typescript
import { useApi, getEntityRequest } from "exprest-web-client";

// React example
function useAuthenticatedApi() {
  const navigate = useNavigate();

  const apiClient = useApi(() => {
    // Handle logout - called on 401 responses
    localStorage.removeItem("token");
    navigate("/login");
  });

  return apiClient;
}

// Usage
const api = useAuthenticatedApi();
const request = getEntityRequest({ collectionUrl: "/api/users", id: 123 });
const response = await api(request);
```

## TypeScript Integration

Exprest Web Client provides full type safety when used with shared types:

```typescript
// shared-types.ts (shared between client and server)
export type User = { id: number; name: string; email: string };
export type UserResponse = { id: number; name: string }; // Client-facing type
export type CreateUserRequest = { name: string; email: string };

// client.ts
import { GetEntityClient, CreateClientWithBody } from "exprest-web-client";
import { UserResponse, CreateUserRequest } from "./shared-types";

const getClient = new GetEntityClient<UserResponse>("/api/users");
const createClient = new CreateClientWithBody<UserResponse, CreateUserRequest>(
  "/api/users"
);

// All responses are properly typed
const userResponse = await getClient.fetch(123);
if (userResponse.isOk && userResponse.data) {
  const user = userResponse.data.entity; // Type: UserResponse
}
```

## Integration with TanStack Query

TanStack Query (formerly React Query) provides powerful data fetching, caching, and synchronization capabilities that complement exprest-web-client's type-safe API interactions. Using them together offers significant benefits over exprest-web-client alone.

### Benefits of Integration

**Enhanced Caching and Performance:**

- **Automatic caching** of API responses reduces redundant network requests
- **Background refetching** keeps data fresh without blocking the UI
- **Optimistic updates** provide immediate feedback for better user experience
- **Request deduplication** prevents multiple identical requests

**Improved User Experience:**

- **Loading and error states** are automatically managed
- **Retry logic** handles transient network failures
- **Pagination support** with built-in infinite queries
- **Real-time data synchronization** across components

**Developer Experience:**

- **Declarative data fetching** with hooks-based API
- **DevTools integration** for debugging queries and cache inspection
- **Type safety** preserved through exprest-web-client's typed responses
- **Simplified state management** eliminates manual loading/error handling

### Integration Patterns

**Basic Query Hook:**

```typescript
import { useQuery } from "@tanstack/react-query";
import { GetEntityClient } from "exprest-web-client";

type UserResponse = { id: number; name: string };

const userClient = new GetEntityClient<UserResponse>("/api/users");

function useUser(userId: number) {
  return useQuery({
    queryKey: ["users", userId],
    queryFn: async () => {
      const response = await userClient.fetch(userId);
      if (!response.isOk || !response.data) {
        throw new Error("Failed to fetch user");
      }
      return response.data.entity;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
    refetchOnWindowFocus: false,
  });
}

// Usage in component
function UserProfile({ userId }: { userId: number }) {
  const { data: user, isLoading, error } = useUser(userId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading user</div>;

  return <div>Welcome, {user?.name}!</div>;
}
```

**Mutation with Optimistic Updates:**

```typescript
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateEntityClientWithBody } from "exprest-web-client";

type UserResponse = { id: number; name: string };
type UpdateUserRequest = { name: string };

const updateUserClient = new UpdateEntityClientWithBody<
  UserResponse,
  UpdateUserRequest
>("/api/users");

function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      userData,
    }: {
      userId: number;
      userData: UpdateUserRequest;
    }) => {
      const response = await updateUserClient.fetch(userId, userData);
      if (!response.isOk || !response.data) {
        throw new Error("Failed to update user");
      }
      return response.data.entity;
    },
    onMutate: async ({ userId, userData }) => {
      await queryClient.cancelQueries({ queryKey: ["users", userId] });

      const previousUser = queryClient.getQueryData(["users", userId]);

      queryClient.setQueryData(["users", userId], (old: UserResponse) => ({
        ...old,
        ...userData,
      }));

      return { previousUser };
    },
    onError: (err, { userId }, context) => {
      queryClient.setQueryData(["users", userId], context?.previousUser);
    },
    onSettled: (data, error, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ["users", userId] });
    },
  });
}
```

**Authentication-Aware Queries:**

```typescript
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { GetCollectionClientWithAuth } from "exprest-web-client";

type UserResponse = { id: number; name: string };

const usersClient = new GetCollectionClientWithAuth<UserResponse>("/api/users");

function useUsers(isAuthenticated: boolean) {
  const navigate = useNavigate();

  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await usersClient.fetch(() => {
        navigate("/login");
      });

      if (!response.isOk || !response.data) {
        throw new Error("Failed to fetch users");
      }
      return response.data.collection;
    },
    enabled: isAuthenticated,
  });
}
```

**Infinite Queries for Pagination:**

```typescript
import { useInfiniteQuery } from "@tanstack/react-query";
import { GetCollectionClientWithParams } from "exprest-web-client";

type UserResponse = { id: number; name: string };
type PaginationParams = { page: string; limit: string };

const usersClient = new GetCollectionClientWithParams<
  UserResponse,
  PaginationParams
>("/api/users");

function useInfiniteUsers() {
  return useInfiniteQuery({
    queryKey: ["users", "infinite"],
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      const response = await usersClient.fetch({
        page: String(pageParam),
        limit: "20",
      });

      if (!response.isOk || !response.data) {
        throw new Error("Failed to fetch users");
      }

      return {
        users: response.data.collection,
        nextPage:
          response.data.collection.length === 20 ? pageParam + 1 : undefined,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  });
}
```

**Custom Query Factory:**

```typescript
import { useQuery } from "@tanstack/react-query";
import { GetEntityClient, GetCollectionClient } from "exprest-web-client";

type UserResponse = { id: number; name: string };

export const userQueries = {
  all: () => ["users"] as const,
  lists: () => [...userQueries.all(), "list"] as const,
  details: () => [...userQueries.all(), "detail"] as const,
  detail: (id: number) => [...userQueries.details(), id] as const,
};

export function useUserQueries() {
  const userClient = new GetEntityClient<UserResponse>("/api/users");
  const usersClient = new GetCollectionClient<UserResponse>("/api/users");

  return {
    useUser: (userId: number) =>
      useQuery({
        queryKey: userQueries.detail(userId),
        queryFn: async () => {
          const response = await userClient.fetch(userId);
          if (!response.isOk || !response.data) {
            throw new Error("Failed to fetch user");
          }
          return response.data.entity;
        },
      }),

    useUsers: () =>
      useQuery({
        queryKey: userQueries.lists(),
        queryFn: async () => {
          const response = await usersClient.fetch();
          if (!response.isOk || !response.data) {
            throw new Error("Failed to fetch users");
          }
          return response.data.collection;
        },
      }),
  };
}
```

### Why This Combination Works Well

**Type Safety Throughout:**

- Exprest-web-client ensures compile-time type safety for API calls
- TanStack Query preserves these types through the query layer
- Full end-to-end type safety from server to UI components

**Predictable Data Flow:**

- Exprest's standardized response format integrates seamlessly with TanStack Query's expectations
- Error handling follows consistent patterns across both libraries
- Authentication state management works naturally with query invalidation

**Performance Optimization:**

- Exprest-web-client handles the network layer efficiently
- TanStack Query adds intelligent caching and background updates
- Together they minimize unnecessary API calls while keeping data fresh

**Developer Productivity:**

- Less boilerplate code for common data fetching patterns
- Built-in loading and error states reduce manual state management
- Powerful DevTools for debugging both API calls and cache state

This integration provides a robust foundation for data-driven applications, combining exprest-web-client's type-safe API layer with TanStack Query's advanced data synchronization capabilities.

## Error Handling

Exprest Web Client handles errors consistently:

- **Network errors**: Return `{ isOk: false }` with no data
- **Authentication errors** (401): Call `setLoggedOutFunction` and return `{ isOk: false, status: 401 }`
- **Server errors**: Return `{ isOk: false, status: <code>, data: <response> }`
- **Parsing errors**: Return `{ isOk: false }` if response cannot be parsed as JSON

```typescript
const response = await client.fetch(123);

if (!response.isOk) {
  if (response.status === 401) {
    console.log("Authentication required");
  } else if (response.status === 404) {
    console.log("User not found");
  } else if (response.data?.errors) {
    console.log("Server errors:", response.data.errors);
  } else {
    console.log("Network or parsing error");
  }
  return;
}

// Success case
const user = response.data!.entity;
```

## Advanced Examples

### Complete CRUD Operations

```typescript
import {
  GetEntityClient,
  GetCollectionClient,
  CreateClientWithBody,
  UpdateEntityClientWithBody,
  DeleteEntityClient,
} from "exprest-web-client";

type User = { id: number; name: string; email: string };
type UserResponse = { id: number; name: string };
type CreateUserRequest = { name: string; email: string };
type UpdateUserRequest = { name: string };

class UserService {
  private getClient = new GetEntityClient<UserResponse>("/api/users");
  private listClient = new GetCollectionClient<UserResponse>("/api/users");
  private createClient = new CreateClientWithBody<
    UserResponse,
    CreateUserRequest
  >("/api/users");
  private updateClient = new UpdateEntityClientWithBody<
    UserResponse,
    UpdateUserRequest
  >("/api/users");
  private deleteClient = new DeleteEntityClient<UserResponse>("/api/users");

  async getUser(id: number): Promise<UserResponse | null> {
    const response = await this.getClient.fetch(id);
    return response.isOk && response.data ? response.data.entity : null;
  }

  async listUsers(): Promise<UserResponse[]> {
    const response = await this.listClient.fetch();
    return response.isOk && response.data ? response.data.collection : [];
  }

  async createUser(userData: CreateUserRequest): Promise<UserResponse | null> {
    const response = await this.createClient.fetch(userData);
    return response.isOk && response.data ? response.data.entity : null;
  }

  async updateUser(
    id: number,
    userData: UpdateUserRequest
  ): Promise<UserResponse | null> {
    const response = await this.updateClient.fetch(id, userData);
    return response.isOk && response.data ? response.data.entity : null;
  }

  async deleteUser(id: number): Promise<boolean> {
    const response = await this.deleteClient.fetch(id);
    return response.isOk;
  }
}
```

### Custom Action with Complex Response

```typescript
import { ActionClientWithAuthWithBody } from "exprest-web-client";

type AnalyticsResult = {
  totalUsers: number;
  activeUsers: number;
  conversionRate: number;
};

type AnalyticsRequest = {
  startDate: string;
  endDate: string;
  filters: string[];
};

const analyticsClient = new ActionClientWithAuthWithBody<
  AnalyticsResult,
  AnalyticsRequest
>("/api/analytics/generate-report");

const handleLogout = () => {
  window.location.href = "/login";
};

const response = await analyticsClient.fetch(handleLogout, {
  startDate: "2023-01-01",
  endDate: "2023-12-31",
  filters: ["premium", "active"],
});

if (response.isOk && response.data) {
  const analytics = response.data.actionResult;
  console.log(`Conversion rate: ${analytics.conversionRate}%`);
}
```

## API Reference

### Client Classes

**Entity Clients:**

- `GetEntityClient<ApiReturnType, ID>`
- `GetEntityClientWithAuth<ApiReturnType, ID>`
- `GetEntityClientWithParams<ApiReturnType, QueryParamsType, ID>`
- `GetEntityClientWithAuthWithParams<ApiReturnType, QueryParamsType, ID>`

**Collection Clients:**

- `GetCollectionClient<ApiReturnType>`
- `GetCollectionClientWithAuth<ApiReturnType>`
- `GetCollectionClientWithParams<ApiReturnType, QueryParamsType>`
- `GetCollectionClientWithAuthWithParams<ApiReturnType, QueryParamsType>`

**Create Clients:**

- `CreateClient<ApiReturnType>`
- `CreateClientWithAuth<ApiReturnType>`
- `CreateClientWithParams<ApiReturnType, QueryParamsType>`
- `CreateClientWithAuthWithParams<ApiReturnType, QueryParamsType>`
- `CreateClientWithBody<ApiReturnType, BodyType>`
- `CreateClientWithAuthWithBody<ApiReturnType, BodyType>`
- `CreateClientWithBodyWithParams<ApiReturnType, QueryParamsType, BodyType>`
- `CreateClientWithAuthWithBodyWithParams<ApiReturnType, QueryParamsType, BodyType>`

**Update Clients:**

- `UpdateEntityClient<ApiReturnType, ID>`
- `UpdateEntityClientWithAuth<ApiReturnType, ID>`
- `UpdateEntityClientWithParams<ApiReturnType, QueryParamsType, ID>`
- `UpdateEntityClientWithAuthWithParams<ApiReturnType, QueryParamsType, ID>`
- `UpdateEntityClientWithBody<ApiReturnType, BodyType, ID>`
- `UpdateEntityClientWithAuthWithBody<ApiReturnType, BodyType, ID>`
- `UpdateEntityClientWithBodyWithParams<ApiReturnType, QueryParamsType, BodyType, ID>`
- `UpdateEntityClientWithAuthWithBodyWithParams<ApiReturnType, QueryParamsType, BodyType, ID>`
- `UpdateSingletonClient<ApiReturnType>`
- `UpdateSingletonClientWithAuth<ApiReturnType>`
- `UpdateSingletonClientWithParams<ApiReturnType, QueryParamsType>`
- `UpdateSingletonClientWithAuthWithParams<ApiReturnType, QueryParamsType>`
- `UpdateSingletonClientWithBody<ApiReturnType, BodyType>`
- `UpdateSingletonClientWithAuthWithBody<ApiReturnType, BodyType>`
- `UpdateSingletonClientWithBodyWithParams<ApiReturnType, QueryParamsType, BodyType>`
- `UpdateSingletonClientWithAuthWithBodyWithParams<ApiReturnType, QueryParamsType, BodyType>`

**Delete Clients:**

- `DeleteEntityClient<ApiReturnType, ID>`
- `DeleteEntityClientWithAuth<ApiReturnType, ID>`
- `DeleteEntityClientWithParams<ApiReturnType, QueryParamsType, ID>`
- `DeleteEntityClientWithAuthWithParams<ApiReturnType, QueryParamsType, ID>`
- `DeleteSingletonClient<ApiReturnType>`
- `DeleteSingletonClientWithAuth<ApiReturnType>`
- `DeleteSingletonClientWithParams<ApiReturnType, QueryParamsType>`
- `DeleteSingletonClientWithAuthWithParams<ApiReturnType, QueryParamsType>`

**Action Clients:**

- `ActionClient<ApiReturnType>`
- `ActionClientWithAuth<ApiReturnType>`
- `ActionClientWithParams<ApiReturnType, QueryParamsType>`
- `ActionClientWithAuthWithParams<ApiReturnType, QueryParamsType>`
- `ActionClientWithBody<ApiReturnType, BodyType>`
- `ActionClientWithAuthWithBody<ApiReturnType, BodyType>`
- `ActionClientWithBodyWithParams<ApiReturnType, QueryParamsType, BodyType>`
- `ActionClientWithAuthWithBodyWithParams<ApiReturnType, QueryParamsType, BodyType>`

### Utility Functions

- `fetchFromApi<T>(request: Request, options?: RequestInit): Promise<ApiResponse<T>>`
- `fetchFromApiWithAuth<T>(setLoggedOutFunction: () => void, request: Request, options?: RequestInit): Promise<ApiResponse<T>>`
- `useApi(navigateToLoginPath: () => void): (request: Request, options?: RequestInit) => Promise<ApiResponse<any>>`
- `buildUrl(urlString: string, params: Object): string`

### Request Builders

- `getEntityRequest<ID>(props: { collectionUrl: string, id: ID, queryParams?, headers? }): Request`
- `getCollectionRequest(props: { resourceUrl: string, queryParams?, headers? }): Request`
- `getSingletonRequest(props: { resourceUrl: string, queryParams?, headers? }): Request`
- `createRequest(props: { resourceUrl: string, data: any, queryParams?, headers? }): Request`
- `updateEntityRequest<ID>(props: { collectionUrl: string, id: ID, data: any, queryParams?, headers? }): Request`
- `updateSingletonRequest(props: { resourceUrl: string, data: any, queryParams?, headers? }): Request`
- `deleteEntityRequest<ID>(props: { collectionUrl: string, id: ID, queryParams?, headers? }): Request`
- `deleteSingletonRequest(props: { resourceUrl: string, queryParams?, headers? }): Request`
- `actionRequest(props: { url: string, data?: any, queryParams?, headers? }): Request`

## License

ISC
