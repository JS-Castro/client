import { baseApi } from "./base";

export async function getPosts(options) {
  return baseApi.get("posts", options).then((res) => res.data);
}

export async function getPost(postId, options) {
  return baseApi.get(`posts/${postId}`, options).then((res) => res.data);
}

export async function getPostComments(postId, options) {
  return baseApi.get(`/posts/${postId}/comments`, options).then((res) => res.data);
}
