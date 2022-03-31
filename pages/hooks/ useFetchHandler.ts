import { useFetchAPI } from "../hooks/useFetchAPI";
export const useFetchHandler = (url: string, query: string) => {

  if (query.length !== 0 || query !== undefined ) {
    const data = useFetchAPI(url, query);

    return data;
  }
  
}