import { MAX_REQUESTS_PER_SECOND } from "src/config/api";

type PollingTask<T = unknown> = {
  id: string;
  apiCall: (signal: AbortSignal) => Promise<T>;
  onSuccess: (data: T) => void;
  onError: (error: unknown) => void;
  pollingInterval: number;
  lastExecuted: number;
  abortController: AbortController;
};

class PollingManager {
  private tasks: Map<string, PollingTask<unknown>> = new Map();
  private isRunning = false;
  private isPaused = false;
  private maxRequestsPerSecond = MAX_REQUESTS_PER_SECOND;
  private minInterval = 1000 / this.maxRequestsPerSecond;
  private lastRequestTime = 0;
  private visibilityChangeListener: (() => void) | null = null;

  constructor() {
    this.setupVisibilityChangeListener();
  }

  private setupVisibilityChangeListener(): void {
    this.visibilityChangeListener = () => {
      if (document.hidden) {
        this.pause();
      } else {
        this.resume();
      }
    };

    document.addEventListener(
      "visibilitychange",
      this.visibilityChangeListener,
    );
  }

  private pause(): void {
    this.isPaused = true;
  }

  private resume(): void {
    this.isPaused = false;

    // Reset last executed times to allow immediate execution when resuming
    for (const task of this.tasks.values()) {
      task.lastExecuted = 0;
    }

    // Restart polling loop if we have tasks but aren't running
    if (this.tasks.size > 0 && !this.isRunning) {
      this.isRunning = true;
      this.runPollingLoop();
    }
  }

  private async executeNextTask(): Promise<void> {
    if (this.isPaused) {
      return;
    }

    const now = Date.now();

    // Find the next task that should be executed
    let nextTask: PollingTask<unknown> | null = null;
    let earliestDue = Infinity;

    for (const task of this.tasks.values()) {
      const timeSinceLastExecution = now - task.lastExecuted;
      if (timeSinceLastExecution >= task.pollingInterval) {
        const dueTime = task.lastExecuted + task.pollingInterval;
        if (dueTime < earliestDue) {
          earliestDue = dueTime;
          nextTask = task;
        }
      }
    }

    if (!nextTask) return;

    // Respect rate limiting
    const timeSinceLastRequest = now - this.lastRequestTime;
    if (timeSinceLastRequest < this.minInterval) {
      const delay = this.minInterval - timeSinceLastRequest;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    if (this.isPaused) {
      return;
    }

    // Execute the task
    try {
      this.lastRequestTime = Date.now();
      nextTask.lastExecuted = this.lastRequestTime;

      const result = await nextTask.apiCall(nextTask.abortController.signal);
      nextTask.onSuccess(result);
    } catch (error) {
      nextTask.onError(error);
    }
  }

  private async runPollingLoop(): Promise<void> {
    while (this.isRunning && this.tasks.size > 0) {
      await this.executeNextTask();

      // Delay to prevent tight loop
      const delay = this.isPaused ? 1000 : 50;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
    this.isRunning = false;
  }

  addTask<T>(
    id: string,
    apiCall: (signal: AbortSignal) => Promise<T>,
    onSuccess: (data: T) => void,
    onError: (error: unknown) => void,
    pollingInterval: number,
  ): void {
    // Remove existing task if it exists
    this.removeTask(id);

    const task: PollingTask<T> = {
      id,
      apiCall,
      onSuccess,
      onError,
      pollingInterval,
      lastExecuted: 0, // Will execute immediately
      abortController: new AbortController(),
    };

    this.tasks.set(id, task as PollingTask<unknown>);

    // Start the polling loop if not already running
    if (!this.isRunning) {
      this.isRunning = true;
      this.runPollingLoop();
    }
  }

  removeTask(id: string): void {
    const task = this.tasks.get(id);
    if (task) {
      task.abortController.abort();
      this.tasks.delete(id);
    }
  }

  stop(): void {
    this.isRunning = false;
    this.isPaused = false;

    if (this.visibilityChangeListener) {
      document.removeEventListener(
        "visibilitychange",
        this.visibilityChangeListener,
      );
      this.visibilityChangeListener = null;
    }

    for (const task of this.tasks.values()) {
      task.abortController.abort();
    }
    this.tasks.clear();
  }

  public pausePolling(): void {
    this.pause();
  }

  public resumePolling(): void {
    this.resume();
  }

  public isPausing(): boolean {
    return this.isPaused;
  }
}

export default PollingManager;
