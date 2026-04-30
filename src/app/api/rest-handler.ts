import { useAuthStore } from "@/app/security/auth/authstore/auth-store.ts";
//TODO: consider using interceptor pattern or some kind of functional factory here instead of class.
// Futhermore, get userId won't be reactive so if user logs out it doesnt auto-re-render which is an issue.
/**
 * Handles client-side HTTP requests and responses (POST, GET, PUT, CREATE, DELETE).
 * */
export class RestHandler {
    private readonly baseURL: string;

    /**
     * @constructor
     * @param baseURL The base URL for REST api calls to the Gestalt Control Plane Backend.
     * */
    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    /**
     * Gets the user UUID from keycloak kc.token.sub in AuthStore.
     * @return string | null of userId (uuid as string or null val).
     * */
    private get userId(): string | null {
        const { userId } = useAuthStore.getState();
        return userId;
    }

    /**
     * Gets the JWT Token from keycloak kc.token in AuthStore.
     *
     * @return string | null of kc.token (as string or null val).
     * */
    private get token(): string | null {
        const { token } = useAuthStore.getState();
        return token;
    }

    /**
     * Handles logic for failed HTTP request.
     * @return Promise<void>
     * @throws Error containing HTTP status and information backend allows frontned to see.
     * */
    private async handleFailedRequest(response: Response): Promise<void> {
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Request failed: ${response.status} ${response.statusText}`, errorText);
            throw new Error(`Request failed with status ${response.status}`);
        }
    }

    /**
     * Handles HTTP GET request.
     * @param endpoint - Resource uri, e.g. `/files`.
     * @return Promise<R> - Promise of generic response type.
     * */
    public async handleGet<R = unknown>(endpoint: string): Promise<R> {
        const userId = this.userId;
        const url = `${this.baseURL}/${endpoint}${userId}`;
        const options: RequestInit = { method: "GET" };
        const response = await fetch(url, options);
        await this.handleFailedRequest(response);
        return await response.json();
    }

    /**
     * Handles HTTP POST request.
     * @param endpoint - Resource uri, e.g. `/files`.
     * @param payload - Generic representing response.
     * @return Promise<R> - Promise of generic response type.
     * */
    public async handlePost<T, R = unknown>(endpoint: string, payload: T): Promise<R> {
        const token = useAuthStore.getState().token;
        const url = `${this.baseURL}/${endpoint}`;
        const options: RequestInit = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload)
        };

        const response = await fetch(url, options);
        await this.handleFailedRequest(response);
        return await response.json();
    }

}

