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

}

