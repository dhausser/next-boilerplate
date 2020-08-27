import { useQuery, gql } from '@apollo/client'
import Link from 'next/link'
import * as PostsTypes from './__generated__/Posts'

const POSTS_QUERY = gql`
  query Posts {
    posts(after: { id: 803 }, first: 2) {
      id
      title
      content
      author {
        id
        email
        name
        profile {
          id
          bio
        }
      }
      published
      createdAt
    }
  }
`

function Posts() {
  const { loading, error, data } = useQuery<PostsTypes.Posts>(POSTS_QUERY)

  if (loading || !data) return <p>Loading...</p>
  if (error) return <p>{error.message}</p>

  return (
    <ul>
      {data.posts.map((post) => (
        <li key={post.id}>
          <Link href="/post/[pid]" as={`/post/${post.id}`}>
            <a>{post.title}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export { Posts }
