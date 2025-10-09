const API_URL = import.meta.env.VITE_API_URL ?? "";
const API_KEY = import.meta.env.VITE_LOVABLE_KEY ?? "";

export class LovableClient {
  private readonly baseUrl: string;
  private readonly apiKey: string;

  constructor(baseUrl: string, apiKey: string) {
    this.baseUrl = baseUrl.replace(/\/$/, "");
    this.apiKey = apiKey;
  }

  get isConfigured(): boolean {
    return Boolean(this.baseUrl && this.apiKey);
  }

  async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    if (!this.isConfigured) {
      throw new Error("Lovable Cloud client is not configured. Configure VITE_API_URL and VITE_LOVABLE_KEY.");
    }

    const headers = new Headers(options.headers);
    headers.set("Content-Type", "application/json");
    headers.set("Authorization", `Bearer ${this.apiKey}`);

    const response = await fetch(`${this.baseUrl}${path}`, {
      ...options,
      headers,
    });

    const payload = await response.json().catch(() => undefined);

    if (!response.ok) {
      throw new Error(
        typeof payload === "string"
          ? payload
          : (payload as Record<string, unknown>)?.message?.toString() ?? "Lovable Cloud request failed"
      );
    }

    return payload as T;
  }

  post<T>(path: string, body?: unknown) {
    return this.request<T>(path, {
      method: "POST",
      body: JSON.stringify(body ?? {}),
    });
  }
}

export const lovableClient = new LovableClient(API_URL, API_KEY);
export const isLovableConfigured = () => lovableClient.isConfigured;
