import { useFetchAPI } from "./useFetchAPI";

export const useFetchHandler = (url: string, query: string) => {

  if (query.length !== 0 || query !== undefined ) {
    return useFetchAPI(url, query);
  }
}