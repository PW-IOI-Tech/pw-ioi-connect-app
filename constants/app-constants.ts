/**
 * Application constants for the PW IOI Connect App.
 *
 */

// // Authentication constants
// export const COOKIE_NAME = "pw-ioi-connect-app-cookie";
// export const REFRESH_COOKIE_NAME = "pw-ioi-connect-app-refresh-cookie";
// export const COOKIE_MAX_AGE = 15; // 15 seconds
// export const JWT_EXPIRY_TIME = "15s"; // 15 seconds
// export const REFRESH_TOKEN_EXPIRY = "30d"; // 30 days
// export const REFRESH_TOKEN_MAX_AGE = 30 * 24 * 60 * 60; // 30 days in seconds

// // Refresh token constants
// export const REFRESH_BEFORE_EXPIRY = 1 * 60; // Refresh token 1 minute before expiry

// // Google OAuth constants
// export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
// export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
// export const GOOGLE_REDIRECT_URI = `${process.env.EXPO_PUBLIC_BASE_URL}/api/auth/google/callback`;
// export const GOOGLE_OAUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";

// // Environment constants
// export const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
// export const APP_SCHEME = process.env.EXPO_PUBLIC_SCHEME;
// export const JWT_SECRET = process.env.JWT_SECRET!;

// // Cookie settings
// export const COOKIE_OPTIONS = {
//   httpOnly: true,
//   secure: true,
//   sameSite: "Lax" as const,
//   path: "/",
//   maxAge: COOKIE_MAX_AGE,
// };

// // Refresh token cookie settings
// export const REFRESH_COOKIE_OPTIONS = {
//   httpOnly: true,
//   secure: true,
//   sameSite: "Lax" as const,
//   path: "/api/auth/refresh", // Path for refresh token endpoint
//   maxAge: REFRESH_TOKEN_MAX_AGE,
// };

// Google OAuth constants
export const GOOGLE_OAUTH_CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID!;

// Backend URL and scheme for the application
export const EXPO_PUBLIC_BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL!;
export const APP_SCHEME = process.env.EXPO_PUBLIC_SCHEME!;
