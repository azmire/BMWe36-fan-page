import { useEffect, useState } from "react";
import { FetchedData } from "../types/dataTypes";

function useFetch(url: string) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<FetchedData[] | []>([]);
  const [error, setError] = useState<string | null>(null);

  const GetData = async () => {
    setLoading(true);
    const requestOptions = {
      method: "GET",
      redirect: "follow" as RequestRedirect,
    };
    try {
      const response = await fetch(url, requestOptions);
      if (response.ok) {
        const result = (await response.json()) as FetchedData[];
        setData(result);
        setError(null);
      }
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    GetData();
  }, []);

  return { loading, data, error };
}

export default useFetch;
