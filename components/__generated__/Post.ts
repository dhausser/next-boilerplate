/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Post
// ====================================================

export interface Post_post_author {
  __typename: 'User'
  name: string | null
  email: string
}

export interface Post_post {
  __typename: 'Post'
  id: string
  title: string
  content: string | null
  author: Post_post_author
  published: boolean
  createdAt: string
}

export interface Post {
  post: Post_post
}

export interface PostVariables {
  id: string
}
