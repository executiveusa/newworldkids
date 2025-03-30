
import { syncToFirebase, getFirebaseData } from '@/integrations/firebase/client';

type SyncJob = {
  id: string;
  table: string;
  interval: number; // in milliseconds
  lastRun: Date | null;
  isRunning: boolean;
  intervalId: number | null;
};

class SyncScheduler {
  private jobs: Record<string, SyncJob> = {};
  private static instance: SyncScheduler;

  private constructor() {}

  public static getInstance(): SyncScheduler {
    if (!SyncScheduler.instance) {
      SyncScheduler.instance = new SyncScheduler();
    }
    return SyncScheduler.instance;
  }

  public addJob(id: string, table: string, intervalMinutes: number): SyncJob {
    if (this.jobs[id]) {
      return this.jobs[id];
    }

    const job: SyncJob = {
      id,
      table,
      interval: intervalMinutes * 60 * 1000,
      lastRun: null,
      isRunning: false,
      intervalId: null
    };

    this.jobs[id] = job;
    return job;
  }

  public startJob(id: string): boolean {
    const job = this.jobs[id];
    if (!job || job.isRunning) return false;

    // Run immediately
    this.runJob(job);

    // Set interval
    const intervalId = window.setInterval(() => {
      this.runJob(job);
    }, job.interval);

    job.intervalId = intervalId;
    job.isRunning = true;

    return true;
  }

  public stopJob(id: string): boolean {
    const job = this.jobs[id];
    if (!job || !job.isRunning || job.intervalId === null) return false;

    window.clearInterval(job.intervalId);
    job.isRunning = false;
    job.intervalId = null;

    return true;
  }

  private async runJob(job: SyncJob) {
    try {
      console.log(`Running sync job for collection: ${job.table}`);
      // Get existing data from Firebase to sync/update
      const existingData = await getFirebaseData(job.table);
      
      // Convert existing data to array if needed
      let dataArray = [];
      if (existingData) {
        // If data exists in Firebase, use it
        dataArray = Object.values(existingData);
      }
      
      const result = await syncToFirebase(job.table, dataArray);
      job.lastRun = new Date();
      console.log(`Sync completed for ${job.table}:`, result);
      return result;
    } catch (error) {
      console.error(`Error in sync job for ${job.table}:`, error);
      return { success: false, message: String(error), count: 0 };
    }
  }

  public getJobStatus(id: string) {
    const job = this.jobs[id];
    if (!job) return null;

    return {
      id: job.id,
      table: job.table,
      isRunning: job.isRunning,
      lastRun: job.lastRun,
      interval: job.interval / (60 * 1000) // Convert back to minutes
    };
  }

  public getAllJobs() {
    return Object.values(this.jobs).map(job => ({
      id: job.id,
      table: job.table,
      isRunning: job.isRunning,
      lastRun: job.lastRun,
      interval: job.interval / (60 * 1000) // Convert back to minutes
    }));
  }

  public manualSync(id: string) {
    const job = this.jobs[id];
    if (!job) return Promise.resolve({ success: false, message: "Job not found", count: 0 });
    
    return this.runJob(job);
  }
}

export const syncScheduler = SyncScheduler.getInstance();
export default syncScheduler;
