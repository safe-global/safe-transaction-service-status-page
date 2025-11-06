import { useEffect, useState, useCallback, useRef } from "react";
import PollingManager from "src/utils/pollingManager";

type apiCallParam<T> = (signal: AbortSignal) => Promise<T>;

type useApiHookReturnValue<T> = {
  isLoading: boolean;
  data?: T;
};

const pollingManager = new PollingManager();

function useApi<T>(
  apiCall: apiCallParam<T>,
  pollingTime?: number,
): useApiHookReturnValue<T> {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<T>();
  const taskIdRef = useRef<string | undefined>(undefined);

  const stableApiCall = useCallback(apiCall, [apiCall]);

  useEffect(() => {
    const taskId = `api-task-${Date.now()}-${Math.random()}`;
    taskIdRef.current = taskId;

    const onSuccess = (result: T) => {
      setData(result);
      setIsLoading(false);
    };

    const onError = (error: unknown) => {
      console.warn("API call failed:", error);
      setData(undefined);
      setIsLoading(false);
    };

    if (pollingTime) {
      // Use polling manager for rate-limited polling
      pollingManager.addTask(
        taskId,
        stableApiCall,
        onSuccess,
        onError,
        pollingTime,
      );
    } else {
      // For non-polling requests, execute immediately
      setIsLoading(true);
      const abortController = new AbortController();

      stableApiCall(abortController.signal).then(onSuccess).catch(onError);

      return () => {
        abortController.abort();
      };
    }

    return () => {
      if (taskIdRef.current) {
        pollingManager.removeTask(taskIdRef.current);
      }
    };
  }, [stableApiCall, pollingTime]);

  return {
    isLoading,
    data,
  };
}

export default useApi;
