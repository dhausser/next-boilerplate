import useSWR from 'swr'
import { Post, PrismaClient } from '@prisma/client'
import { GetStaticProps } from 'next'
import { Button } from '@/components/button'
import styles from 'styles/Home.module.css'

interface Props {
  posts: Post[]
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

function HomePage({ posts }: Props) {
  const { data, error } = useSWR('/api/user', fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        Welcome {data.user.name}
        <Button />
        <ul>
          {posts.map((post) => (
            <li key={post.id}>{post.title}</li>
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
