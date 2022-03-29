import axios from 'axios';
import { useState, useEffect } from 'react';

export const useFetchAPI = (url: string) => {
  const [data, setData] = useState<object>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(!isLoading);
        const res = await axios.get(url);
        console.log(res, "res");
        setData(res.data);

        if (res.status === 200) {
          setIsLoading(isLoading);
        }
        
      } catch(err) {
        console.log(err);
        setIsError(!isError);
      }
    })();
  },[]);

  return {
    data,
    isLoading,
    isError
  }
}