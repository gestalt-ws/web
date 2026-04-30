import { useAuthStore } from "@/app/security/auth/authstore/auth-store.ts";

/**
 * Handles client-side HTTP requests and responses (POST, GET, PUT, CREATE, DELETE).
 * */
export class RestHandler {
    private readonly baseURL: string;

    /**
     * @constructor
     * @param baseURL The base URL for REST api calls to the Gestalto Control Plane Backend.
     * */
    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

}