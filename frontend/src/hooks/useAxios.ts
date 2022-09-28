import React from "react";
import axios, { AxiosRequestHeaders } from "axios";

const useAxios = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const activeRequest = React.useRef<AbortController[]>([]);

  const sendRequest = React.useCallback(
    async <DataType>(
      url: string,
      method: string = "GET",
      data?: any,
      headers?: AxiosRequestHeaders
    ) => {
      setIsLoading(true);
      const abortController = new AbortController();
      activeRequest.current.push(abortController);

      try {
        const response = await axios.request<DataType>({
          url,
          method,
          data,
          headers,
          signal: abortController.signal,
        });

        activeRequest.current = activeRequest.current.filter(
          (reqCtrl) => reqCtrl !== abortController
        );

        setIsLoading(false);

        return response.data;
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          setError((error as any).response.data.message);
        } else {
          setError(error.message || "Something went wrong, please try again.");
        }
        setIsLoading(false);
        throw error;
      }
    },
    []
  );

  const clearError = () => {
    setError("");
  };

  React.useEffect(() => {
    return () => {
      activeRequest.current.forEach((abortController) =>
        abortController.abort()
      );
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};

export default useAxios;
