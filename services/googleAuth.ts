import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import * as SecureStore from "expo-secure-store";
import { GOOGLE_OAUTH_CLIENT_ID, EXPO_PUBLIC_BACKEND_URL, APP_SCHEME } from "../constants/app-constants";
import { AuthResponse, GoogleAuthConfig } from "@/types/user";

WebBrowser.maybeCompleteAuthSession();

const BACKEND_URL = EXPO_PUBLIC_BACKEND_URL;

export class GoogleAuthService {
  private static instance: GoogleAuthService;
  private config: GoogleAuthConfig;

  private constructor() {
    this.config = {
      clientId: GOOGLE_OAUTH_CLIENT_ID,
      redirectUri: AuthSession.makeRedirectUri({
        scheme: APP_SCHEME,
        path: "/auth",
      }),
    };
  }

  public static getInstance(): GoogleAuthService {
    if (!GoogleAuthService.instance) {
      GoogleAuthService.instance = new GoogleAuthService();
    }
    return GoogleAuthService.instance;
  }

  public createAuthRequest() {
    const [request, response, promptAsync] = Google.useAuthRequest({
      clientId: this.config.clientId,
      redirectUri: this.config.redirectUri,
      scopes: ["openid", "profile", "email"],
      responseType: AuthSession.ResponseType.Code,
      extraParams: {
        access_type: "offline",
        prompt: "consent",
      },
    });

    return { request, response, promptAsync };
  }

  public async exchangeCodeForToken(code: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          redirectUri: this.config.redirectUri,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to exchange code for token");
      }

      const data = await response.json();
      return data; // Assuming the backend returns an AuthResponse
    } catch (error) {
      console.error("Error exchanging code for token:", error);
      throw error;
    }
  }

  public async storeToken(token: string): Promise<void> {
    try {
      await SecureStore.setItemAsync("auth_token", token);
    } catch (error) {
      console.error("Error storing token:", error);
      throw error;
    }
  }

  public async storeRefreshToken(refreshToken: string): Promise<void> {
    try {
      await SecureStore.setItemAsync("refresh_token", refreshToken);
    } catch (error) {
      console.error("Error storing refresh token:", error);
      throw error;
    }
  }

  public async getStoredToken(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync("auth_token");
    } catch (error) {
      console.error("Error retrieving stored token:", error);
      return null;
    }
  }

  public async getStoredRefreshToken(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync("refresh_token");
    } catch (error) {
      console.error("Error retrieving stored refresh token:", error);
      return null;
    }
  }

  public async removeStoredToken(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync("auth_token");
    } catch (error) {
      console.error("Error removing stored token:", error);
      throw error;
    }
  }

  public async removeStoredRefreshToken(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync("refresh_token");
    } catch (error) {
      console.error("Error removing stored refresh token:", error);
      throw error;
    }
  }

  public async refreshAccessToken(): Promise<string | null> {
    try {
      const refreshToken = await this.getStoredRefreshToken();

      if (!refreshToken) {
        console.warn("No refresh token found, cannot refresh access token");
        return null;
      }

      const response = await fetch(`${BACKEND_URL}/api/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        console.error("Failed to refresh access token", response.statusText);
        return null;
      }

      const data = await response.json();

      if (data.token) {
        await this.storeToken(data.token);

        if (data.refreshToken) {
          await this.storeRefreshToken(data.refreshToken);
        }

        return data.token;
      }

      console.error("Refresh token response did not contain a new token");
      return null;
    } catch (error) {
      console.error("Error refreshing access token:", error);
      return null;
    }
  }

  public async validateToken(token: string): Promise<boolean> {
    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/validate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.ok;
    } catch (error) {
      console.error("Error validating token:", error);
      return false;
    }
  }

  public async validateTokenWithRefresh(token: string): Promise<string | null> {
    try {
      const isValid = await this.validateToken(token);
      if (isValid) {
        return token;
      }

      // If the token is invalid, try to refresh it
      console.warn("Token is invalid, attempting to refresh...");
      const newToken = await this.refreshAccessToken();
      if (newToken) {
        return newToken;
      }

      console.error("Failed to refresh token");
      return null;
    } catch (error) {
      console.error("Error validating token with refresh:", error);
      return null;
    }
  }

  public async getUserData(token: string): Promise<any> {
    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user info");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching user info:", error);
      throw error;
    }
  }

  public async signOut(): Promise<void> {
    try {
      await this.removeStoredToken();
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  }
}
