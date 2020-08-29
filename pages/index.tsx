import { Post, PrismaClient } from '@prisma/client'
import { GetStaticProps } from 'next'
// import { GetServerSideProps } from 'next'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { initializeApollo } from '../apollo/client'
import { POSTS_QUERY } from '@/components/posts'

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
  const apolloClient: ApolloClient<NormalizedCacheObject | null> = initializeApollo()
  const prisma = new PrismaClient()

  await apolloClient.query({
    query: POSTS_QUERY,
  })

  const posts = await prisma.post.findMany({
    select: { id: true, title: true, content: true },
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      posts,
    },
  }
}

export default HomePage
