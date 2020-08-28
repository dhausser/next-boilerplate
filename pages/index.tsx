import { Post, PrismaClient } from '@prisma/client'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { Button } from '@/components/button'
import { Posts } from '@/components/posts'
import styles from 'styles/Home.module.css'

interface Props {
  posts: Post[]
}

function HomePage({ posts }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        Welcome!
        <Button />
        Static Props:
        <div className={styles.grid}>
          {posts.map((post) => (
            <div className={styles.card} key={post.id}>
              <Link href="/post/[pid]" as={`/post/${post.id}`}>
                <a>{post.title}</a>
              </Link>
            </div>
          ))}
        </div>
        Dynamic data:
        <Posts />
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
