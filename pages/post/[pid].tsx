import { useRouter } from 'next/router'
import styles from 'styles/Home.module.css'
import { Post } from '@/components/post'

const PostPage = () => {
  const router = useRouter()
  const { pid } = router.query

  const id = typeof pid === 'string' ? pid : null

  if (!id) {
    return (
      <p>
        Post ID:
        {pid}
      </p>
    )
  }

  return (
    <div className={styles.container}>
      <Post id={id} />
    </div>
  )
}

export default PostPage
