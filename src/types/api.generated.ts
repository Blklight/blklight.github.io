// Gerado por `bun run gen:api` a partir de http://localhost:4000/docs/openapi.json. Não edite.

export interface paths {
    "/api/v1/auth/register": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Register a new user */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        /** Format: email */
                        email: string;
                        username: string;
                        password: string;
                    };
                };
            };
            responses: {
                /** @description Default Response */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                accessToken?: string;
                                user?: {
                                    id?: string;
                                    email?: string;
                                    username?: string;
                                    /** @enum {string} */
                                    role?: "user" | "admin";
                                    emailVerified?: boolean;
                                    onboardingComplete?: boolean;
                                    createdAt?: string;
                                };
                                profile?: {
                                    id?: string;
                                    userId?: string;
                                    username?: string;
                                    displayName?: string | null;
                                    avatarUrl?: string | null;
                                    isPrivate?: boolean;
                                };
                                apps?: string[];
                            };
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/auth/login": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Login with email or username */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        identifier: string;
                        password: string;
                        /** @default false */
                        rememberMe?: boolean;
                    };
                };
            };
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                accessToken?: string;
                                user?: {
                                    id?: string;
                                    email?: string;
                                    username?: string;
                                    /** @enum {string} */
                                    role?: "user" | "admin";
                                    emailVerified?: boolean;
                                    onboardingComplete?: boolean;
                                    createdAt?: string;
                                };
                                profile?: {
                                    id?: string;
                                    userId?: string;
                                    username?: string;
                                    displayName?: string | null;
                                    avatarUrl?: string | null;
                                    isPrivate?: boolean;
                                };
                                apps?: string[];
                            };
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/auth/refresh": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Refresh access token */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                accessToken?: string;
                                user?: {
                                    id?: string;
                                    email?: string;
                                    username?: string;
                                    /** @enum {string} */
                                    role?: "user" | "admin";
                                    emailVerified?: boolean;
                                    onboardingComplete?: boolean;
                                    createdAt?: string;
                                };
                                profile?: {
                                    id?: string;
                                    userId?: string;
                                    username?: string;
                                    displayName?: string | null;
                                    avatarUrl?: string | null;
                                    isPrivate?: boolean;
                                };
                                apps?: string[];
                            };
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/auth/logout": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Logout and invalidate refresh token */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @enum {object|null} */
                            data?: never | null;
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/auth/onboarding/status": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get onboarding status */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                step?: string;
                                user?: {
                                    id?: string;
                                    email?: string;
                                    username?: string;
                                    role?: string;
                                    emailVerified?: boolean;
                                    onboardingComplete?: boolean;
                                    createdAt?: string;
                                    hasPassword?: boolean;
                                };
                                profile?: {
                                    id?: string;
                                    userId?: string;
                                    username?: string;
                                    displayName?: string | null;
                                    avatarUrl?: string | null;
                                    isPrivate?: boolean;
                                };
                                apps?: string[];
                            };
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/auth/onboarding/username": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Set username during OAuth onboarding */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        username: string;
                    };
                };
            };
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @enum {object|null} */
                            data?: never | null;
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/auth/onboarding/complete": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Create onboarding records (profile, signature, workspace, canvas) */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @enum {object|null} */
                            data?: never | null;
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/auth/verify-email": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Verify email address */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        token: string;
                    };
                };
            };
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @enum {object|null} */
                            data?: never | null;
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/auth/resend-verification": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Resend verification email */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @enum {object|null} */
                            data?: never | null;
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/auth/forgot-password": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Request password reset */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        /** Format: email */
                        email: string;
                    };
                };
            };
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @enum {object|null} */
                            data?: never | null;
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/auth/reset-password": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Reset password */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        token: string;
                        password: string;
                    };
                };
            };
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @enum {object|null} */
                            data?: never | null;
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/auth/github": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Redirect to GitHub OAuth */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/auth/github/link": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Link GitHub account (start) */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/auth/github/link/start": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Link GitHub account (redirect) */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/auth/github/callback": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** GitHub OAuth callback */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/auth/google": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Redirect to Google OAuth */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/auth/google/link": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Link Google account (start) */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/auth/google/link/start": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Link Google account (redirect) */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/auth/google/callback": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Google OAuth callback */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/auth/account/unlink/{provider}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** Unlink OAuth provider */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    provider: "github" | "google";
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @enum {object|null} */
                            data?: never | null;
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/profiles/{username}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get public profile by username */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    username: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                username?: string;
                                displayName?: string | null;
                                bio?: string | null;
                                bioPrivate?: string | null;
                                avatarUrl?: string | null;
                                socialLinks?: {
                                    [key: string]: unknown;
                                } | null;
                                createdAt?: string;
                                isPrivate?: boolean;
                                isFollowing?: boolean | null;
                                followStatus?: string | null;
                            };
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/profiles/{username}/documents": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get published documents by a specific author */
        get: {
            parameters: {
                query?: {
                    cursor?: string;
                    limit?: number;
                    type?: string;
                };
                header?: never;
                path: {
                    username: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                items?: unknown[];
                                nextCursor?: string | null;
                                total?: number;
                            };
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/profiles/me": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get own profile */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                username?: string;
                                displayName?: string | null;
                                bio?: string | null;
                                bioPrivate?: string | null;
                                avatarUrl?: string | null;
                                socialLinks?: {
                                    [key: string]: unknown;
                                } | null;
                                createdAt?: string;
                                isPrivate?: boolean;
                                email?: string;
                                emailVerified?: boolean;
                                role?: string;
                            };
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        /** Delete own account */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @enum {object|null} */
                            data?: never | null;
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        options?: never;
        head?: never;
        /** Update own profile */
        patch: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        username?: string;
                        displayName?: string | null;
                        bio?: string | null;
                        bioPrivate?: string | null;
                        /** Format: uri */
                        avatarUrl?: string | null;
                        socialLinks?: {
                            twitter?: string;
                            github?: string;
                            linkedin?: string;
                            /** Format: uri */
                            website?: string;
                        } | null;
                        isPrivate?: boolean;
                    };
                };
            };
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                username?: string;
                                displayName?: string | null;
                                bio?: string | null;
                                bioPrivate?: string | null;
                                avatarUrl?: string | null;
                                socialLinks?: {
                                    [key: string]: unknown;
                                } | null;
                                createdAt?: string;
                                isPrivate?: boolean;
                                email?: string;
                                emailVerified?: boolean;
                                role?: string;
                            };
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        trace?: never;
    };
    "/api/v1/documents/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get public document feed */
        get: {
            parameters: {
                query?: {
                    cursor?: string;
                    limit?: number;
                    type?: string;
                    author?: string;
                    q?: string;
                    sort?: "recent" | "popular";
                    category?: string;
                    tag?: string;
                    organization?: string;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                items?: {
                                    id?: string;
                                    title?: string;
                                    abstract?: string | null;
                                    coverImageUrl?: string | null;
                                    slug?: string;
                                    publishedAt?: string;
                                    typeName?: string;
                                    author?: {
                                        username?: string;
                                        displayName?: string | null;
                                        avatarUrl?: string | null;
                                    };
                                    authorship?: {
                                        publicIdentifier?: string;
                                    };
                                    likesCount?: number;
                                    category?: {
                                        id?: string;
                                        name?: string;
                                        slug?: string;
                                    } | null;
                                    tags?: {
                                        id?: string;
                                        name?: string;
                                        slug?: string;
                                    }[];
                                    organization?: {
                                        id?: string;
                                        orgname?: string;
                                        name?: string;
                                    } | null;
                                }[];
                                nextCursor?: string | null;
                                total?: number;
                            };
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        put?: never;
        /** Create a new document */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        title: string;
                        abstract?: string | null;
                        content?: {
                            [key: string]: unknown;
                        } | null;
                        /** Format: uri */
                        coverImageUrl?: string | null;
                        type: string;
                        slug?: string;
                        categoryId?: string | null;
                        tags?: string[];
                        organizationId?: string | null;
                    };
                };
            };
            responses: {
                /** @description Default Response */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                id?: string;
                                authorId?: string;
                                typeId?: string;
                                typeName?: string;
                                status?: string;
                                title?: string;
                                abstract?: string | null;
                                content?: {
                                    [key: string]: unknown;
                                } | null;
                                coverImageUrl?: string | null;
                                slug?: string;
                                authorship?: {
                                    authorName?: string;
                                    username?: string;
                                    documentHash?: string;
                                    publicIdentifier?: string;
                                    hmac?: string;
                                    signedAt?: string;
                                } | null;
                                publishedAt?: string | null;
                                createdAt?: string;
                                updatedAt?: string;
                                style?: {
                                    typography?: string;
                                    paperStyle?: {
                                        [key: string]: unknown;
                                    } | null;
                                    paperTexture?: {
                                        [key: string]: unknown;
                                    } | null;
                                    coverSettings?: {
                                        [key: string]: unknown;
                                    } | null;
                                    documentHeader?: {
                                        [key: string]: unknown;
                                    } | null;
                                    documentFooter?: {
                                        [key: string]: unknown;
                                    } | null;
                                    documentSignature?: {
                                        [key: string]: unknown;
                                    } | null;
                                };
                                organization?: {
                                    id?: string;
                                    orgname?: string;
                                    name?: string;
                                } | null;
                            };
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/documents/{username}/{slug}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get a public document by username and slug */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    username: string;
                    slug: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                id?: string;
                                title?: string;
                                abstract?: string | null;
                                content?: {
                                    [key: string]: unknown;
                                } | null;
                                coverImageUrl?: string | null;
                                slug?: string;
                                publishedAt?: string;
                                typeName?: string;
                                author?: {
                                    username?: string;
                                    displayName?: string | null;
                                    avatarUrl?: string | null;
                                };
                                style?: {
                                    typography?: string;
                                    paperStyle?: {
                                        [key: string]: unknown;
                                    } | null;
                                    paperTexture?: {
                                        [key: string]: unknown;
                                    } | null;
                                    coverSettings?: {
                                        [key: string]: unknown;
                                    } | null;
                                    documentHeader?: {
                                        [key: string]: unknown;
                                    } | null;
                                    documentFooter?: {
                                        [key: string]: unknown;
                                    } | null;
                                    documentSignature?: {
                                        [key: string]: unknown;
                                    } | null;
                                };
                                authorship?: {
                                    authorName?: string;
                                    username?: string;
                                    documentHash?: string;
                                    publicIdentifier?: string;
                                    hmac?: string;
                                    signedAt?: string;
                                } | null;
                                likes?: {
                                    likesCount?: number;
                                    likedByMe?: boolean | null;
                                };
                                category?: {
                                    id?: string;
                                    name?: string;
                                    slug?: string;
                                } | null;
                                tags?: {
                                    id?: string;
                                    name?: string;
                                    slug?: string;
                                }[];
                                exercises?: {
                                    [key: string]: unknown;
                                }[];
                                organization?: {
                                    id?: string;
                                    orgname?: string;
                                    name?: string;
                                } | null;
                            };
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/documents/me": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get my documents */
        get: {
            parameters: {
                query?: {
                    limit?: number;
                    offset?: number;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                id?: string;
                                title?: string;
                                abstract?: string | null;
                                status?: string;
                                typeName?: string;
                                slug?: string;
                                coverImageUrl?: string | null;
                                authorship?: {
                                    authorName?: string;
                                    username?: string;
                                    documentHash?: string;
                                    publicIdentifier?: string;
                                    hmac?: string;
                                    signedAt?: string;
                                } | null;
                                publishedAt?: string | null;
                                updatedAt?: string;
                                createdAt?: string;
                                organization?: {
                                    id?: string;
                                    orgname?: string;
                                    name?: string;
                                } | null;
                            }[];
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/documents/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get one of my documents by ID
         * @description Returns a full document owned by the caller (draft, published or archived), including style, category and tags. Used to reopen a document in the editor.
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                id?: string;
                                authorId?: string;
                                typeId?: string;
                                typeName?: string;
                                status?: string;
                                title?: string;
                                abstract?: string | null;
                                content?: {
                                    [key: string]: unknown;
                                } | null;
                                coverImageUrl?: string | null;
                                slug?: string;
                                authorship?: {
                                    authorName?: string;
                                    username?: string;
                                    documentHash?: string;
                                    publicIdentifier?: string;
                                    hmac?: string;
                                    signedAt?: string;
                                } | null;
                                publishedAt?: string | null;
                                createdAt?: string;
                                updatedAt?: string;
                                style?: {
                                    typography?: string;
                                    paperStyle?: {
                                        [key: string]: unknown;
                                    } | null;
                                    paperTexture?: {
                                        [key: string]: unknown;
                                    } | null;
                                    coverSettings?: {
                                        [key: string]: unknown;
                                    } | null;
                                    documentHeader?: {
                                        [key: string]: unknown;
                                    } | null;
                                    documentFooter?: {
                                        [key: string]: unknown;
                                    } | null;
                                    documentSignature?: {
                                        [key: string]: unknown;
                                    } | null;
                                };
                                organization?: {
                                    id?: string;
                                    orgname?: string;
                                    name?: string;
                                } | null;
                                category?: {
                                    id?: string;
                                    name?: string;
                                    slug?: string;
                                } | null;
                                tags?: {
                                    id?: string;
                                    name?: string;
                                    slug?: string;
                                }[];
                            };
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        /** Delete a document */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @enum {object|null} */
                            data?: never | null;
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        options?: never;
        head?: never;
        /** Update a document */
        patch: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        title?: string;
                        abstract?: string | null;
                        content?: {
                            [key: string]: unknown;
                        } | null;
                        /** Format: uri */
                        coverImageUrl?: string | null;
                        type?: string;
                        slug?: string;
                        /** @enum {string} */
                        typography?: "sans" | "serif" | "mono";
                        paperStyle?: {
                            [key: string]: unknown;
                        } | null;
                        paperTexture?: {
                            [key: string]: unknown;
                        } | null;
                        coverSettings?: {
                            [key: string]: unknown;
                        } | null;
                        documentHeader?: {
                            [key: string]: unknown;
                        } | null;
                        documentFooter?: {
                            [key: string]: unknown;
                        } | null;
                        documentSignature?: {
                            [key: string]: unknown;
                        } | null;
                        categoryId?: string | null;
                        tags?: string[];
                        organizationId?: string | null;
                    };
                };
            };
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                id?: string;
                                authorId?: string;
                                typeId?: string;
                                typeName?: string;
                                status?: string;
                                title?: string;
                                abstract?: string | null;
                                content?: {
                                    [key: string]: unknown;
                                } | null;
                                coverImageUrl?: string | null;
                                slug?: string;
                                authorship?: {
                                    authorName?: string;
                                    username?: string;
                                    documentHash?: string;
                                    publicIdentifier?: string;
                                    hmac?: string;
                                    signedAt?: string;
                                } | null;
                                publishedAt?: string | null;
                                createdAt?: string;
                                updatedAt?: string;
                                style?: {
                                    typography?: string;
                                    paperStyle?: {
                                        [key: string]: unknown;
                                    } | null;
                                    paperTexture?: {
                                        [key: string]: unknown;
                                    } | null;
                                    coverSettings?: {
                                        [key: string]: unknown;
                                    } | null;
                                    documentHeader?: {
                                        [key: string]: unknown;
                                    } | null;
                                    documentFooter?: {
                                        [key: string]: unknown;
                                    } | null;
                                    documentSignature?: {
                                        [key: string]: unknown;
                                    } | null;
                                };
                                organization?: {
                                    id?: string;
                                    orgname?: string;
                                    name?: string;
                                } | null;
                            };
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        trace?: never;
    };
    "/api/v1/documents/{id}/publish": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /** Publish a document */
        patch: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                id?: string;
                                authorId?: string;
                                typeId?: string;
                                typeName?: string;
                                status?: string;
                                title?: string;
                                abstract?: string | null;
                                content?: {
                                    [key: string]: unknown;
                                } | null;
                                coverImageUrl?: string | null;
                                slug?: string;
                                authorship?: {
                                    authorName?: string;
                                    username?: string;
                                    documentHash?: string;
                                    publicIdentifier?: string;
                                    hmac?: string;
                                    signedAt?: string;
                                } | null;
                                publishedAt?: string | null;
                                createdAt?: string;
                                updatedAt?: string;
                                style?: {
                                    typography?: string;
                                    paperStyle?: {
                                        [key: string]: unknown;
                                    } | null;
                                    paperTexture?: {
                                        [key: string]: unknown;
                                    } | null;
                                    coverSettings?: {
                                        [key: string]: unknown;
                                    } | null;
                                    documentHeader?: {
                                        [key: string]: unknown;
                                    } | null;
                                    documentFooter?: {
                                        [key: string]: unknown;
                                    } | null;
                                    documentSignature?: {
                                        [key: string]: unknown;
                                    } | null;
                                };
                                organization?: {
                                    id?: string;
                                    orgname?: string;
                                    name?: string;
                                } | null;
                            };
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        trace?: never;
    };
    "/api/v1/document-style-templates/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get my style templates */
        get: {
            parameters: {
                query?: {
                    type?: string;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                id?: string;
                                authorId?: string;
                                name?: string;
                                documentType?: string | null;
                                typography?: string;
                                paperStyle?: {
                                    [key: string]: unknown;
                                } | null;
                                paperTexture?: {
                                    [key: string]: unknown;
                                } | null;
                                documentHeader?: {
                                    [key: string]: unknown;
                                } | null;
                                documentFooter?: {
                                    [key: string]: unknown;
                                } | null;
                                createdAt?: string;
                            }[];
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        put?: never;
        /** Create a style template */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        name: string;
                        documentType?: string | null;
                        /** @enum {string} */
                        typography: "sans" | "serif" | "mono";
                        paperStyle?: {
                            [key: string]: unknown;
                        } | null;
                        paperTexture?: {
                            [key: string]: unknown;
                        } | null;
                        documentHeader?: {
                            [key: string]: unknown;
                        } | null;
                        documentFooter?: {
                            [key: string]: unknown;
                        } | null;
                    };
                };
            };
            responses: {
                /** @description Default Response */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                [key: string]: unknown;
                            };
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/document-style-templates/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** Delete a style template */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @enum {object|null} */
                            data?: never | null;
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/documents/{id}/exercises": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get exercises for a document */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: unknown[];
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        put?: never;
        /** Create an exercise for a document */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        /** @enum {string} */
                        type: "code";
                        data: {
                            prompt: string;
                            /** @enum {string} */
                            language: "javascript" | "typescript";
                            initialCode: string;
                            expectedOutput: string;
                        };
                    } | {
                        /** @enum {string} */
                        type: "quiz";
                        data: {
                            question: string;
                            options: string[];
                            correctIndex: number;
                        };
                    };
                };
            };
            responses: {
                /** @description Default Response */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                [key: string]: unknown;
                            };
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/exercises/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** Delete an exercise */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @enum {object|null} */
                            data?: never | null;
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        options?: never;
        head?: never;
        /** Update an exercise */
        patch: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        /** @enum {string} */
                        type: "code";
                        data: {
                            prompt?: string;
                            /** @enum {string} */
                            language?: "javascript" | "typescript";
                            initialCode?: string;
                            expectedOutput?: string;
                        };
                    } | {
                        /** @enum {string} */
                        type: "quiz";
                        data: {
                            question?: string;
                            options?: string[];
                            correctIndex?: number;
                        };
                    };
                };
            };
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                [key: string]: unknown;
                            };
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        trace?: never;
    };
    "/api/v1/exercises/{id}/submit": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Submit an answer to an exercise */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        /** @enum {string} */
                        type: "code";
                        code: string;
                    } | {
                        /** @enum {string} */
                        type: "quiz";
                        answerIndex: number;
                    };
                };
            };
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                isCorrect?: boolean;
                                attemptsCount?: number;
                            };
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/documents/{id}/like": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Toggle like on a document */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                liked?: boolean;
                                likesCount?: number;
                            };
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/documents/{id}/likes": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get likes count for a document */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                likesCount?: number;
                                likedByMe?: boolean | null;
                            };
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/documents/{id}/bookmark": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Toggle bookmark on a document */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                bookmarked?: boolean;
                            };
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/bookmarks/me": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get my bookmarks */
        get: {
            parameters: {
                query?: {
                    cursor?: string;
                    limit?: number;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                items?: unknown[];
                                nextCursor?: string | null;
                                total?: number;
                            };
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
                /** @description Default Response */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @enum {object|null} */
                            data?: never | null;
                            error?: {
                                [key: string]: unknown;
                            };
                            message?: string;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/categories/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get all categories */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                id?: string;
                                name?: string;
                                slug?: string;
                                description?: string | null;
                                parentId?: string | null;
                                createdAt?: string;
                                documentCount?: number;
                                children?: unknown[];
                            }[];
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        put?: never;
        /** Create a category (admin only) */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        name: string;
                        description?: string | null;
                        parentId?: string | null;
                    };
                };
            };
            responses: {
                /** @description Default Response */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                id?: string;
                                name?: string;
                                slug?: string;
                                description?: string | null;
                                parentId?: string | null;
                                createdAt?: string;
                            };
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
                /** @description Default Response */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @enum {object|null} */
                            data?: never | null;
                            error?: {
                                [key: string]: unknown;
                            };
                            message?: string;
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/categories/{slug}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get a category by slug */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    slug: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                id?: string;
                                name?: string;
                                slug?: string;
                                description?: string | null;
                                parentId?: string | null;
                                createdAt?: string;
                                documentCount?: number;
                                children?: unknown[];
                            };
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
                /** @description Default Response */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @enum {object|null} */
                            data?: never | null;
                            error?: {
                                [key: string]: unknown;
                            };
                            message?: string;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/categories/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** Delete a category (admin only) */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @enum {object|null} */
                            data?: never | null;
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        options?: never;
        head?: never;
        /** Update a category (admin only) */
        patch: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        name?: string;
                        description?: string | null;
                        parentId?: string | null;
                    };
                };
            };
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                id?: string;
                                name?: string;
                                slug?: string;
                                description?: string | null;
                                parentId?: string | null;
                                createdAt?: string;
                            };
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
                /** @description Default Response */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @enum {object|null} */
                            data?: never | null;
                            error?: {
                                [key: string]: unknown;
                            };
                            message?: string;
                        };
                    };
                };
            };
        };
        trace?: never;
    };
    "/api/v1/tags/popular": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get popular tags sorted by usage */
        get: {
            parameters: {
                query?: {
                    limit?: number;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                id?: string;
                                name?: string;
                                slug?: string;
                                documentCount?: number;
                            }[];
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
                /** @description Default Response */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @enum {object|null} */
                            data?: never | null;
                            error?: {
                                [key: string]: unknown;
                            };
                            message?: string;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/books/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get public book feed (requires auth) */
        get: {
            parameters: {
                query?: {
                    cursor?: string;
                    limit?: number;
                    category?: string;
                    tag?: string;
                    q?: string;
                    sort?: "recent" | "popular";
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                [key: string]: unknown;
                            };
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
                /** @description Default Response */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @enum {object|null} */
                            data?: never | null;
                            error?: {
                                [key: string]: unknown;
                            };
                            message?: string;
                        };
                    };
                };
            };
        };
        put?: never;
        /** Create a new book */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        title: string;
                        description?: string | null;
                        /** Format: uri */
                        coverImageUrl?: string | null;
                        slug?: string;
                        categoryId?: string | null;
                        tags?: string[];
                    };
                };
            };
            responses: {
                /** @description Default Response */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                [key: string]: unknown;
                            };
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
                /** @description Default Response */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @enum {object|null} */
                            data?: never | null;
                            error?: {
                                [key: string]: unknown;
                            };
                            message?: string;
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/books/{username}/{slug}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get a public book by username and slug */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    username: string;
                    slug: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                [key: string]: unknown;
                            };
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
                /** @description Default Response */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @enum {object|null} */
                            data?: never | null;
                            error?: {
                                [key: string]: unknown;
                            };
                            message?: string;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/books/{id}/progress/{chapterId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /** Update reading progress on a chapter */
        patch: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                    chapterId: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @enum {object|null} */
                            data?: never | null;
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        trace?: never;
    };
    "/api/v1/books/me": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get my books */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: unknown[];
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/books/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** Delete a book */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @enum {object|null} */
                            data?: never | null;
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        options?: never;
        head?: never;
        /** Update a book */
        patch: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        title?: string;
                        description?: string | null;
                        /** Format: uri */
                        coverImageUrl?: string | null;
                        slug?: string;
                        categoryId?: string | null;
                        tags?: string[];
                    };
                };
            };
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                [key: string]: unknown;
                            };
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
                /** @description Default Response */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @enum {object|null} */
                            data?: never | null;
                            error?: {
                                [key: string]: unknown;
                            };
                            message?: string;
                        };
                    };
                };
            };
        };
        trace?: never;
    };
    "/api/v1/books/{id}/publish": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /** Publish a book */
        patch: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                [key: string]: unknown;
                            };
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        trace?: never;
    };
    "/api/v1/books/{id}/chapters": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Add a chapter to a book */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        documentId: string;
                        position?: number;
                        introText?: string | null;
                        outroText?: string | null;
                    };
                };
            };
            responses: {
                /** @description Default Response */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                [key: string]: unknown;
                            };
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
                /** @description Default Response */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @enum {object|null} */
                            data?: never | null;
                            error?: {
                                [key: string]: unknown;
                            };
                            message?: string;
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/books/{id}/chapters/{chapterId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** Remove a chapter from a book */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                    chapterId: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @enum {object|null} */
                            data?: never | null;
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        options?: never;
        head?: never;
        /** Update a chapter */
        patch: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                    chapterId: string;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        introText?: string | null;
                        outroText?: string | null;
                        position?: number;
                    };
                };
            };
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                [key: string]: unknown;
                            };
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
                /** @description Default Response */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @enum {object|null} */
                            data?: never | null;
                            error?: {
                                [key: string]: unknown;
                            };
                            message?: string;
                        };
                    };
                };
            };
        };
        trace?: never;
    };
    "/api/v1/books/{id}/chapters/reorder": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /** Reorder chapters in a book */
        patch: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        chapters: {
                            id: string;
                            position: number;
                        }[];
                    };
                };
            };
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @enum {object|null} */
                            data?: never | null;
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
                /** @description Default Response */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @enum {object|null} */
                            data?: never | null;
                            error?: {
                                [key: string]: unknown;
                            };
                            message?: string;
                        };
                    };
                };
            };
        };
        trace?: never;
    };
    "/api/v1/books/{id}/toc": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /** Update table of contents */
        patch: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        toc: {
                            chapterId: string;
                            title: string;
                            headings: {
                                level: number;
                                text: string;
                                anchor: string;
                            }[];
                        }[];
                    };
                };
            };
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                [key: string]: unknown;
                            };
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
                /** @description Default Response */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @enum {object|null} */
                            data?: never | null;
                            error?: {
                                [key: string]: unknown;
                            };
                            message?: string;
                        };
                    };
                };
            };
        };
        trace?: never;
    };
    "/api/v1/highlights/palette": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get my highlight palette */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                [key: string]: unknown;
                            };
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /** Update my highlight palette */
        patch: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        colors: string[];
                    };
                };
            };
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @enum {object|null} */
                            data?: never | null;
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
                /** @description Default Response */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @enum {object|null} */
                            data?: never | null;
                            error?: {
                                [key: string]: unknown;
                            };
                            message?: string;
                        };
                    };
                };
            };
        };
        trace?: never;
    };
    "/api/v1/highlights/me": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get my highlights grouped by document */
        get: {
            parameters: {
                query?: {
                    cursor?: string;
                    limit?: number;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                items?: {
                                    document?: {
                                        id?: string;
                                        title?: string;
                                        slug?: string;
                                        authorUsername?: string;
                                    };
                                    highlights?: {
                                        id?: string;
                                        profileId?: string;
                                        documentId?: string;
                                        selection?: {
                                            text?: string;
                                            color?: string;
                                            position?: {
                                                nodeIndex?: number;
                                                offsetStart?: number;
                                                offsetEnd?: number;
                                            };
                                        };
                                        annotation?: {
                                            [key: string]: unknown;
                                        } | null;
                                        createdAt?: string;
                                        updatedAt?: string;
                                    }[];
                                }[];
                                nextCursor?: string | null;
                                total?: number;
                            };
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
                /** @description Default Response */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @enum {object|null} */
                            data?: never | null;
                            error?: {
                                [key: string]: unknown;
                            };
                            message?: string;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/highlights/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** Delete a highlight */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @enum {object|null} */
                            data?: never | null;
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        options?: never;
        head?: never;
        /** Update a highlight */
        patch: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        selection?: {
                            text: string;
                            color: string;
                            position: {
                                nodeIndex: number;
                                offsetStart: number;
                                offsetEnd: number;
                            };
                        };
                        annotation?: {
                            [key: string]: unknown;
                        } | null;
                    };
                };
            };
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                [key: string]: unknown;
                            };
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
                /** @description Default Response */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @enum {object|null} */
                            data?: never | null;
                            error?: {
                                [key: string]: unknown;
                            };
                            message?: string;
                        };
                    };
                };
            };
        };
        trace?: never;
    };
    "/api/v1/documents/{id}/highlights": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Create a highlight on a document */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        selection: {
                            text: string;
                            color: string;
                            position: {
                                nodeIndex: number;
                                offsetStart: number;
                                offsetEnd: number;
                            };
                        };
                        annotation?: Record<string, never> | null;
                    };
                };
            };
            responses: {
                /** @description Default Response */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                [key: string]: unknown;
                            };
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
                /** @description Default Response */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @enum {object|null} */
                            data?: never | null;
                            error?: {
                                [key: string]: unknown;
                            };
                            message?: string;
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/documents/{id}/highlights/me": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get my highlights on a document (reading order) */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: unknown[];
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/workspace/me": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get my workspace */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                workspace?: {
                                    id?: string;
                                    ownerId?: string;
                                    type?: string;
                                    name?: string;
                                    isPersonal?: boolean;
                                    colorLabels?: {
                                        [key: string]: string;
                                    } | null;
                                    createdAt?: string;
                                    updatedAt?: string;
                                };
                                counts?: {
                                    notes?: number;
                                    highlights?: number;
                                    journals?: number;
                                };
                            };
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/workspace/me/color-labels": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /** Update color labels on my workspace */
        patch: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        colorLabels: {
                            [key: string]: string;
                        };
                    } | {
                        /** @enum {object|null} */
                        colorLabels: never | null;
                    };
                };
            };
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @enum {object|null} */
                            data?: never | null;
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
                /** @description Default Response */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @enum {object|null} */
                            data?: never | null;
                            error?: {
                                [key: string]: unknown;
                            };
                            message?: string;
                        };
                    };
                };
            };
        };
        trace?: never;
    };
    "/api/v1/notes/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get my notes */
        get: {
            parameters: {
                query?: {
                    cursor?: string;
                    limit?: number;
                    type?: "text" | "code" | "list";
                    color?: "slate" | "gray" | "zinc" | "red" | "orange" | "amber" | "yellow" | "lime" | "green" | "emerald" | "teal" | "cyan" | "sky" | "blue" | "indigo" | "violet" | "purple" | "fuchsia" | "pink" | "rose";
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                items?: {
                                    id?: string;
                                    canvasId?: string;
                                    title?: string | null;
                                    content?: string;
                                    type?: string;
                                    language?: string | null;
                                    color?: string;
                                    deletedAt?: string | null;
                                    createdAt?: string;
                                    updatedAt?: string;
                                }[];
                                nextCursor?: string | null;
                                total?: number;
                            };
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
                /** @description Default Response */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @enum {object|null} */
                            data?: never | null;
                            error?: {
                                [key: string]: unknown;
                            };
                            message?: string;
                        };
                    };
                };
            };
        };
        put?: never;
        /** Create a note */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        title?: string | null;
                        content: string;
                        /**
                         * @default text
                         * @enum {string}
                         */
                        type?: "text" | "code" | "list";
                        language?: string | null;
                        /**
                         * @default yellow
                         * @enum {string}
                         */
                        color?: "slate" | "gray" | "zinc" | "red" | "orange" | "amber" | "yellow" | "lime" | "green" | "emerald" | "teal" | "cyan" | "sky" | "blue" | "indigo" | "violet" | "purple" | "fuchsia" | "pink" | "rose";
                    };
                };
            };
            responses: {
                /** @description Default Response */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                [key: string]: unknown;
                            };
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
                /** @description Default Response */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @enum {object|null} */
                            data?: never | null;
                            error?: {
                                [key: string]: unknown;
                            };
                            message?: string;
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/notes/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get a note by ID */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                [key: string]: unknown;
                            };
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
                /** @description Default Response */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @enum {object|null} */
                            data?: never | null;
                            error?: {
                                [key: string]: unknown;
                            };
                            message?: string;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        /** Delete a note */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @enum {object|null} */
                            data?: never | null;
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        options?: never;
        head?: never;
        /** Update a note */
        patch: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        title?: string | null;
                        content?: string;
                        /** @enum {string} */
                        type?: "text" | "code" | "list";
                        language?: string | null;
                        /** @enum {string} */
                        color?: "slate" | "gray" | "zinc" | "red" | "orange" | "amber" | "yellow" | "lime" | "green" | "emerald" | "teal" | "cyan" | "sky" | "blue" | "indigo" | "violet" | "purple" | "fuchsia" | "pink" | "rose";
                    };
                };
            };
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                [key: string]: unknown;
                            };
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
                /** @description Default Response */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @enum {object|null} */
                            data?: never | null;
                            error?: {
                                [key: string]: unknown;
                            };
                            message?: string;
                        };
                    };
                };
            };
        };
        trace?: never;
    };
    "/api/v1/journals/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get my journals */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: unknown[];
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        put?: never;
        /** Create a journal */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        title: string;
                        description?: string | null;
                        /**
                         * @default indigo
                         * @enum {string}
                         */
                        color?: "slate" | "gray" | "zinc" | "red" | "orange" | "amber" | "yellow" | "lime" | "green" | "emerald" | "teal" | "cyan" | "sky" | "blue" | "indigo" | "violet" | "purple" | "fuchsia" | "pink" | "rose";
                    };
                };
            };
            responses: {
                /** @description Default Response */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                [key: string]: unknown;
                            };
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
                /** @description Default Response */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @enum {object|null} */
                            data?: never | null;
                            error?: {
                                [key: string]: unknown;
                            };
                            message?: string;
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/journals/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get a journal by ID */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                [key: string]: unknown;
                            };
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
                /** @description Default Response */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @enum {object|null} */
                            data?: never | null;
                            error?: {
                                [key: string]: unknown;
                            };
                            message?: string;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        /** Delete a journal */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @enum {object|null} */
                            data?: never | null;
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        options?: never;
        head?: never;
        /** Update a journal */
        patch: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        title?: string;
                        description?: string | null;
                        /**
                         * @default indigo
                         * @enum {string}
                         */
                        color?: "slate" | "gray" | "zinc" | "red" | "orange" | "amber" | "yellow" | "lime" | "green" | "emerald" | "teal" | "cyan" | "sky" | "blue" | "indigo" | "violet" | "purple" | "fuchsia" | "pink" | "rose";
                    };
                };
            };
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                [key: string]: unknown;
                            };
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
                /** @description Default Response */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @enum {object|null} */
                            data?: never | null;
                            error?: {
                                [key: string]: unknown;
                            };
                            message?: string;
                        };
                    };
                };
            };
        };
        trace?: never;
    };
    "/api/v1/journals/{id}/highlights": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Add a highlight to a journal */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        highlightId: string;
                        position?: number;
                    };
                };
            };
            responses: {
                /** @description Default Response */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                [key: string]: unknown;
                            };
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
                /** @description Default Response */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @enum {object|null} */
                            data?: never | null;
                            error?: {
                                [key: string]: unknown;
                            };
                            message?: string;
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/journals/{id}/highlights/{highlightId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** Remove a highlight from a journal */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                    highlightId: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @enum {object|null} */
                            data?: never | null;
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/journals/{id}/highlights/reorder": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /** Reorder highlights in a journal */
        patch: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        highlights: {
                            id: string;
                            position: number;
                        }[];
                    };
                };
            };
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @enum {object|null} */
                            data?: never | null;
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
                /** @description Default Response */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @enum {object|null} */
                            data?: never | null;
                            error?: {
                                [key: string]: unknown;
                            };
                            message?: string;
                        };
                    };
                };
            };
        };
        trace?: never;
    };
    "/api/v1/profiles/{username}/followers": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get followers of a profile */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    username: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                [key: string]: unknown;
                            };
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/profiles/{username}/following": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get following list of a profile */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    username: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                [key: string]: unknown;
                            };
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/profiles/{username}/follow": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Follow a profile */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    username: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                [key: string]: unknown;
                            };
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
                /** @description Default Response */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @enum {object|null} */
                            data?: never | null;
                            error?: {
                                [key: string]: unknown;
                            };
                            message?: string;
                        };
                    };
                };
            };
        };
        /** Unfollow a profile */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    username: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @enum {object|null} */
                            data?: never | null;
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/feed/following": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get following feed */
        get: {
            parameters: {
                query?: {
                    cursor?: string;
                    limit?: number;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                [key: string]: unknown;
                            };
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/follows/requests": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get pending follow requests */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: unknown[];
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/follows/requests/{id}/accept": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Accept a follow request */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @enum {object|null} */
                            data?: never | null;
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/follows/requests/{id}/reject": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** Reject a follow request */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @enum {object|null} */
                            data?: never | null;
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/platform-apps": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List all available platform apps */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                id?: string;
                                slug?: string;
                                name?: string;
                                description?: string | null;
                                accessMode?: string;
                                iconUrl?: string | null;
                                tagline?: string | null;
                                category?: string | null;
                                isActive?: boolean;
                                createdAt?: string;
                            }[];
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        put?: never;
        /** Create a new platform app (admin only) */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        slug: string;
                        name: string;
                        description?: string | null;
                        /**
                         * @default open
                         * @enum {string}
                         */
                        accessMode?: "open" | "beta";
                        /** Format: uri */
                        iconUrl?: string | null;
                        tagline?: string | null;
                        category?: string | null;
                    };
                };
            };
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/platform-apps/me": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List apps activated by current user */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                id?: string;
                                appId?: string;
                                activatedAt?: string;
                                slug?: string;
                                name?: string;
                                description?: string | null;
                            }[];
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        put?: never;
        /** Activate apps for current user */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        apps: string[];
                    };
                };
            };
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @enum {object|null} */
                            data?: never | null;
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/platform-apps/me/{appId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** Deactivate an app */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    appId: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @enum {object|null} */
                            data?: never | null;
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/platform-apps/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /** Update a platform app (admin only) */
        patch: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        name?: string;
                        description?: string | null;
                        /** @enum {string} */
                        accessMode?: "open" | "beta";
                        /** Format: uri */
                        iconUrl?: string | null;
                        tagline?: string | null;
                        category?: string | null;
                        isActive?: boolean;
                    };
                };
            };
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        trace?: never;
    };
    "/api/v1/platform-apps/{appId}/invites": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List invites for a beta app (admin only) */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    appId: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        put?: never;
        /** Authorize a profile for a beta app (admin only) */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    appId: string;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        profileId: string;
                    };
                };
            };
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/canvas/me": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get user's canvas with all notes and positions */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                [key: string]: unknown;
                            };
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/canvas/me/positions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /** Batch update note positions on canvas */
        patch: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        positions: {
                            noteId: string;
                            x: number;
                            y: number;
                            w?: number;
                            h?: number;
                            z?: number;
                        }[];
                    };
                };
            };
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @enum {object|null} */
                            data?: never | null;
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        trace?: never;
    };
    "/api/v1/memory/search": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Semantic search across indexed content */
        get: {
            parameters: {
                query: {
                    q: string;
                    limit?: number;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: unknown[];
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/memory/related/{sourceType}/{sourceId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get related items for a specific content piece */
        get: {
            parameters: {
                query?: {
                    limit?: number;
                };
                header?: never;
                path: {
                    sourceType: "note" | "document" | "journal_highlight" | "book_chapter";
                    sourceId: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: unknown[];
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/memory/digest": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get weekly connections digest */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: unknown[];
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/chat/servers": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List my chat servers */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: unknown[];
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        put?: never;
        /** Create a chat server (admin only) */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        name: string;
                        /** Format: uri */
                        iconUrl?: string | null;
                    };
                };
            };
            responses: {
                /** @description Default Response */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                [key: string]: unknown;
                            };
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/chat/servers/all": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List all chat servers with member counts (admin only) */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/chat/servers/{serverId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get a chat server with its channels */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    serverId: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                [key: string]: unknown;
                            };
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/chat/servers/{serverId}/members": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List members of a chat server */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    serverId: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: unknown[];
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        put?: never;
        /** Add a member to a chat server */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    serverId: string;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        profileId: string;
                    };
                };
            };
            responses: {
                /** @description Default Response */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                [key: string]: unknown;
                            };
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/chat/servers/{serverId}/members/{memberId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** Remove a member from a chat server */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    serverId: string;
                    memberId: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @enum {object|null} */
                            data?: never | null;
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        options?: never;
        head?: never;
        /** Approve or reject a pending chat server member */
        patch: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    serverId: string;
                    memberId: string;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        /** @enum {string} */
                        status: "accepted" | "rejected";
                    };
                };
            };
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                [key: string]: unknown;
                            };
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        trace?: never;
    };
    "/api/v1/chat/servers/{serverId}/channels": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List channels of a chat server */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    serverId: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: unknown[];
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        put?: never;
        /** Create a channel in a chat server */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    serverId: string;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        name: string;
                        /**
                         * @default text
                         * @enum {string}
                         */
                        type?: "text";
                    };
                };
            };
            responses: {
                /** @description Default Response */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                [key: string]: unknown;
                            };
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/chat/channels/{channelId}/messages": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List messages in a channel */
        get: {
            parameters: {
                query?: {
                    cursor?: string;
                    limit?: number;
                };
                header?: never;
                path: {
                    channelId: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                items?: unknown[];
                                nextCursor?: string | null;
                                total?: number;
                            };
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        put?: never;
        /** Send a message to a channel */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    channelId: string;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        content: string;
                    };
                };
            };
            responses: {
                /** @description Default Response */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                [key: string]: unknown;
                            };
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/chat/messages/{messageId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** Soft delete a message */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    messageId: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @enum {object|null} */
                            data?: never | null;
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        options?: never;
        head?: never;
        /** Edit a message */
        patch: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    messageId: string;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        content: string;
                    };
                };
            };
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                [key: string]: unknown;
                            };
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        trace?: never;
    };
    "/api/v1/chat/ws-ticket": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Create a WebSocket connection ticket */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                ticket?: string;
                                expiresIn?: number;
                            };
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/org/{orgname}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get a public organization by orgname
         * @description Private organizations are only returned to accepted members; otherwise a 404 is returned.
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    orgname: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                id?: string;
                                ownerId?: string;
                                name?: string;
                                orgname?: string;
                                description?: string | null;
                                isPrivate?: boolean;
                                createdAt?: string;
                                updatedAt?: string;
                            };
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/org/{orgname}/documents": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List the published documents of an organization
         * @description Private organizations answer 404 for everyone but their accepted members. Documents of private authors follow the same rule as the public feed.
         */
        get: {
            parameters: {
                query?: {
                    cursor?: string;
                    limit?: number;
                    type?: string;
                    sort?: "recent" | "popular";
                };
                header?: never;
                path: {
                    orgname: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                items?: {
                                    id?: string;
                                    title?: string;
                                    abstract?: string | null;
                                    coverImageUrl?: string | null;
                                    slug?: string;
                                    publishedAt?: string;
                                    typeName?: string;
                                    author?: {
                                        username?: string;
                                        displayName?: string | null;
                                        avatarUrl?: string | null;
                                    };
                                    authorship?: {
                                        publicIdentifier?: string;
                                    };
                                    likesCount?: number;
                                    category?: {
                                        id?: string;
                                        name?: string;
                                        slug?: string;
                                    } | null;
                                    tags?: {
                                        id?: string;
                                        name?: string;
                                        slug?: string;
                                    }[];
                                    organization?: {
                                        id?: string;
                                        orgname?: string;
                                        name?: string;
                                    } | null;
                                }[];
                                nextCursor?: string | null;
                                total?: number;
                            };
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/organizations": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Create an organization */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        name: string;
                        orgname: string;
                        description?: string | null;
                        /** @default false */
                        isPrivate?: boolean;
                    };
                };
            };
            responses: {
                /** @description Default Response */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                id?: string;
                                ownerId?: string;
                                name?: string;
                                orgname?: string;
                                description?: string | null;
                                isPrivate?: boolean;
                                createdAt?: string;
                                updatedAt?: string;
                            };
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/organizations/me": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List organizations where I am an accepted member */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                id?: string;
                                ownerId?: string;
                                name?: string;
                                orgname?: string;
                                description?: string | null;
                                isPrivate?: boolean;
                                createdAt?: string;
                                updatedAt?: string;
                                myRole?: string;
                            }[];
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/organizations/{id}/invite": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Invite a profile to an organization
         * @description Owner/admin only. Creates a pending membership.
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        profileId: string;
                    };
                };
            };
            responses: {
                /** @description Default Response */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                id?: string;
                                orgId?: string;
                                profileId?: string;
                                role?: string;
                                status?: string;
                                invitedBy?: string | null;
                                requestedAt?: string;
                                decidedAt?: string | null;
                                username?: string;
                                displayName?: string | null;
                                avatarUrl?: string | null;
                            };
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/organizations/{id}/decide": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Accept or reject my pending invitation */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        /** @enum {string} */
                        decision: "accepted" | "rejected";
                    };
                };
            };
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                id?: string;
                                orgId?: string;
                                profileId?: string;
                                role?: string;
                                status?: string;
                                invitedBy?: string | null;
                                requestedAt?: string;
                                decidedAt?: string | null;
                                username?: string;
                                displayName?: string | null;
                                avatarUrl?: string | null;
                            };
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/organizations/{id}/members/me": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /**
         * Leave an organization
         * @description Any member can leave. The owner cannot.
         */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @enum {object|null} */
                            data?: never | null;
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/organizations/{id}/members/{profileId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /**
         * Remove a member from an organization
         * @description Owner/admin only. The owner cannot be removed.
         */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                    profileId: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @enum {object|null} */
                            data?: never | null;
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/organizations/{id}/members": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List accepted members of an organization
         * @description Only accepted members of the organization can list.
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                id?: string;
                                orgId?: string;
                                profileId?: string;
                                role?: string;
                                status?: string;
                                invitedBy?: string | null;
                                requestedAt?: string;
                                decidedAt?: string | null;
                                username?: string;
                                displayName?: string | null;
                                avatarUrl?: string | null;
                            }[];
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/admin/overview": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Admin dashboard overview (admin only) */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/admin/users": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List users with filters (admin only) */
        get: {
            parameters: {
                query?: {
                    search?: string;
                    role?: "user" | "admin";
                    page?: number;
                    limit?: number;
                    deleted?: "true" | "false";
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/admin/platform-apps": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List all platform apps (admin only, includes inactive) */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data?: {
                                id?: string;
                                slug?: string;
                                name?: string;
                                description?: string | null;
                                accessMode?: string;
                                iconUrl?: string | null;
                                tagline?: string | null;
                                category?: string | null;
                                isActive?: boolean;
                                createdAt?: string;
                            }[];
                            /** @enum {object|null} */
                            error?: never | null;
                            message?: string;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/admin/users/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get user detail (admin only) */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/admin/users/{id}/role": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /** Update user role (admin only) */
        patch: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        /** @enum {string} */
                        role: "user" | "admin";
                    };
                };
            };
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        trace?: never;
    };
    "/health": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: never;
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
