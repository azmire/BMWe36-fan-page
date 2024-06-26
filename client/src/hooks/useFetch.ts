import { useEffect, useState } from "react";
import { ProfileTypes } from "../types/dataTypes";

function useFetch(url: string | null) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ProfileTypes | []>([]);
  const [error, setError] = useState<string | null>(null);

  const getData = async () => {
    if (!url) return;

    setLoading(true);

    //const myHeaders = new Headers();
    //myHeaders.append("Authorization", `Bearer ${token}`);
    //const urlencoded = new URLSearchParams();
    const requestOptions = {
      method: "GET",
      //headers: myHeaders,
      //body: urlencoded,
      redirect: "follow" as RequestRedirect,
    };
    try {
      const response = await fetch(url, requestOptions);
      if (response.ok) {
        const result = (await response.json()) as ProfileTypes;
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
    if (!url) return;
    getData();
  }, []);

  return { loading, data, error };
}

export default useFetch;
