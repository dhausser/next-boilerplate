/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PostWhereUniqueInput } from './../../__generated__/globalTypes'

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
  id: number
  title: string
  content: string | null
  author: Post_post_author
  published: boolean
  createdAt: any
}

export interface Post {
  post: Post_post | null
}

export interface PostVariables {
  input: PostWhereUniqueInput
}
