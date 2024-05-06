import { baseApi } from "./base";

export async function getTodos(options) {
  return baseApi.get("todos", options).then((res) => res.data);
}
