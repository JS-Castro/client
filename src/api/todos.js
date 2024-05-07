import { baseApi } from "./base";

export async function getTodos(options) {
  return baseApi.get("todos", options).then((res) => res.data);
}

export async function getTodosByUser(userId, options) {
  return baseApi.get(`todos?userId=${userId}`, options).then((res) => res.data);
}
