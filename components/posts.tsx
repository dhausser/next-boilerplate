import { useQuery, gql } from '@apollo/client'
import Link from 'next/link'
import styles from 'styles/Home.module.css'
import * as PostsTypes from './__generated__/Posts'

export const POSTS_QUERY = gql`
  query Posts {
    posts {
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
    <div className={styles.grid}>
      {data.posts.map((post) => (
        <div className={styles.card} key={post.id}>
          <Link href="/post/[pid]" as={`/post/${post.id}`}>
            <a href="/post/[pid]">{post.title}</a>
          </Link>
        </div>
      ))}
    </div>
  )
}

export { Posts }
