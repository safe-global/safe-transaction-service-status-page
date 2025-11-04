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
  private maxRequestsPerSecond = 5;
  private minInterval = 1000 / this.maxRequestsPerSecond; // 200ms minimum between requests
  private lastRequestTime = 0;

  private async executeNextTask(): Promise<void> {
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

      // Small delay to prevent tight loop
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    this.isRunning = false;
  }

  addTask<T>(
    id: string,
    apiCall: (signal: AbortSignal) => Promise<T>,
    onSuccess: (data: T) => void,
    onError: (error: unknown) => void,
    pollingInterval: number
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
    for (const task of this.tasks.values()) {
      task.abortController.abort();
    }
    this.tasks.clear();
  }
}

export default PollingManager;
