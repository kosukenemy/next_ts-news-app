export type CRUDTypes = "GET" | "POST" | "PUT" | "DELETE";

export type CreateNewBookItem = {
  id?: string;
  name?: string;
  description?: string;
};

export type GoogleBooksAPIType = {
  items: string[] | undefined;
  kind: string | undefined;
  totalItems: number | undefined;
}