import axios, { AxiosResponse, AxiosError } from 'axios';
import { useState, useEffect } from 'react';
// type
import { GoogleBooksAPIType } from "../../pages/types";

function isAxiosError(error: any): error is AxiosError {
  return !!error.isAxiosError;
}

export const useFetchAPI = (url: string, query?: string) => {
  const [data, setData] = useState<GoogleBooksAPIType>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(!isLoading);
        if ( query?.length === 0 || query === undefined ) return false;
        const res: AxiosResponse = await axios.get(`${url}/volumes?q=${query}`);
        setData(res.data);

        if (res.status === 200) {
          setIsLoading(isLoading);
        }
        
      } catch(err) {
        if (isAxiosError(err)) {
          console.log(err);
          setIsError(!isError);
        }
      }
    })();
  },[query]);

  if (query?.length !== 0 || query === undefined ) {
    return {
      data,
      isLoading,
      isError
    }
  }

  return {};
}