import { useQuery, gql } from '@apollo/client'
import { Post } from '@prisma/client'
import Link from 'next/link'

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
  const { loading, error, data } = useQuery<{ posts: Post[] }>(POSTS_QUERY)

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
