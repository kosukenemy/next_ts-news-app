export type CRUDTypes = "GET" | "POST" | "PUT" | "DELETE";

export type CreateNewBookItem = {
  id?: string;
  name?: string;
  description?: string;
};