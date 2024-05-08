import { baseApi } from "./base";

export async function getPosts(options) {
  return baseApi.get("posts", options).then((res) => res.data);
}

export async function getPost(postId, options) {
  return baseApi.get(`posts/${postId}`, options).then((res) => res.data);
}

export async function getPostsByUser(userId, options) {
  return baseApi.get(`posts?userId=${userId}`, options).then((res) => res.data);
}

export async function createPost(data, options) {
  return baseApi.post("posts", data, options).then((res) => res.data);
}

export async function editPost(postId, data, options) {
  return baseApi.put(`posts/${postId}`, data, options).then((res) => res.data);
}

export async function deletePost(postId, options) {
  return baseApi.delete(`posts/${postId}`, options).then((res) => res.data);
}
