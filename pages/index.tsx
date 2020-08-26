import { useQuery, gql } from '@apollo/client'
import { Post, PrismaClient } from '@prisma/client'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { Button } from '@/components/button'
import styles from 'styles/Home.module.css'

interface Props {
  posts: Post[]
}

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

function HomePage({ posts }: Props) {
  const { loading, error, data } = useQuery<{ posts: Post[] }>(POSTS_QUERY)

  if (loading || !data) return <p>Loading...</p>
  if (error) return <p>{error.message}</p>

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        Welcome!
        <Button />
        Static Props:
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <Link href="/post/[pid]" as={`/post/${post.id}`}>
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
        Dynamic data:
        <ul>
          {data.posts.map((post) => (
            <li key={post.id}>
              <Link href="/post/[pid]" as={`/post/${post.id}`}>
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prisma = new PrismaClient()

  const posts = await prisma.post.findMany({
    select: { id: true, title: true, content: true },
  })

  return {
    props: {
      posts,
    },
  }
}

export default HomePage
