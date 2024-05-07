import { baseApi } from "./base";

export async function getUsers(options) {
  return baseApi.get("users", options).then((res) => res.data);
}

export async function getUser(userId, options) {
  return baseApi.get(`users/${userId}`, options).then((res) => res.data);
}

export async function getPostAuthor(userId, options) {
  return baseApi.get(`/posts?userId=${userId}`, options).then((res) => res.data);
}
