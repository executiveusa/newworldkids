const baseUrl = import.meta.env.VITE_EIGENT_API_URL || 'http://localhost:3001';

export type EigentAgent = {
  id: string;
  name: string;
  description?: string;
  status?: 'online' | 'offline' | 'degraded';
};

export type EigentJobRequest = {
  agentId: string;
  prompt: string;
  documents?: string[];
};

export type EigentJobStatus = {
  jobId: string;
  status: 'pending' | 'running' | 'succeeded' | 'failed';
  result?: string;
};

async function safeFetch<T>(path: string, options?: RequestInit, fallback?: T): Promise<T> {
  try {
    const res = await fetch(`${baseUrl}${path}`, options);
    if (!res.ok) {
      throw new Error(`Eigent API error ${res.status}`);
    }
    return await res.json() as T;
  } catch (error) {
    console.warn('Eigent API unavailable, returning fallback.', error);
    if (fallback !== undefined) {
      return fallback;
    }
    throw error;
  }
}

export const eigentClient = {
  baseUrl,
  async health() {
    return safeFetch<{ ok: boolean; providers?: string[] }>('/providers', undefined, { ok: false, providers: [] });
  },
  async listAgents(): Promise<EigentAgent[]> {
    return safeFetch<EigentAgent[]>(
      '/agents',
      undefined,
      [
        { id: 'novasign', name: 'NovaSign', description: 'Document signing & verification', status: 'offline' },
        { id: 'echo', name: 'EchoAgent', description: 'Summaries & status updates', status: 'offline' },
      ],
    );
  },
  async createJob(payload: EigentJobRequest): Promise<{ jobId: string }> {
    return safeFetch<{ jobId: string }>('/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }, { jobId: 'local-fallback-job' });
  },
  async getJobStatus(jobId: string): Promise<EigentJobStatus> {
    return safeFetch<EigentJobStatus>(`/jobs/${jobId}`, undefined, { jobId, status: 'pending' });
  },
};
