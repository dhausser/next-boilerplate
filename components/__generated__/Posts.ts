/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Posts
// ====================================================

export interface Posts_posts_author_profile {
  __typename: 'Profile'
  id: string
  bio: string | null
}

export interface Posts_posts_author {
  __typename: 'User'
  id: string
  email: string
  name: string | null
  profile: Posts_posts_author_profile | null
}

export interface Posts_posts {
  __typename: 'Post'
  id: string
  title: string
  content: string | null
  author: Posts_posts_author
  published: boolean
  createdAt: string
}

export interface Posts {
  posts: Posts_posts[]
}
