import { QueryClient } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL ?? "";
const API_KEY = import.meta.env.VITE_LOVABLE_KEY ?? "";

export class LovableResponseError extends Error {
  public status: number;
  public data?: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = "LovableResponseError";
    this.status = status;
    this.data = data;
  }
}

export interface LovableRequestOptions extends RequestInit {
  withAuth?: boolean;
}

export class LovableClient {
  private readonly baseUrl: string;
  private readonly apiKey: string;

  constructor(baseUrl: string, apiKey: string) {
    this.baseUrl = baseUrl.replace(/\/$/, "");
    this.apiKey = apiKey;
  }

  public get isConfigured(): boolean {
    return Boolean(this.baseUrl && this.apiKey);
  }

  async request<T>(path: string, options: LovableRequestOptions = {}): Promise<T> {
    if (!this.isConfigured) {
      throw new Error(
        "Lovable Cloud client is not configured. Ensure VITE_API_URL and VITE_LOVABLE_KEY are defined."
      );
    }

    const headers = new Headers(options.headers);
    if (options.withAuth !== false) {
      headers.set("Authorization", `Bearer ${this.apiKey}`);
    }
    headers.set("Content-Type", "application/json");

    const response = await fetch(`${this.baseUrl}${path}`, {
      ...options,
      headers,
    });

    const contentType = response.headers.get("content-type");
    const data = contentType?.includes("application/json") ? await response.json() : await response.text();

    if (!response.ok) {
      throw new LovableResponseError(
        typeof data === "string" ? data : (data as Record<string, unknown>)?.message?.toString() ?? "Request failed",
        response.status,
        data
      );
    }

    return data as T;
  }

  get<T>(path: string, options?: LovableRequestOptions) {
    return this.request<T>(path, { ...options, method: "GET" });
  }

  post<T>(path: string, body?: unknown, options?: LovableRequestOptions) {
    return this.request<T>(path, {
      ...options,
      method: "POST",
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  }

  put<T>(path: string, body?: unknown, options?: LovableRequestOptions) {
    return this.request<T>(path, {
      ...options,
      method: "PUT",
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  }

  delete<T>(path: string, options?: LovableRequestOptions) {
    return this.request<T>(path, { ...options, method: "DELETE" });
  }
}

export const lovableClient = new LovableClient(API_URL, API_KEY);
export const queryClient = new QueryClient();

export const isLovableConfigured = () => lovableClient.isConfigured;
export const getLovableCredentials = () => ({
  baseUrl: API_URL,
  apiKey: API_KEY,
});
