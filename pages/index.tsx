import useSWR from 'swr'
import { Button } from '@/components/button'
import styles from 'styles/Home.module.css'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

function HomePage() {
  const { data, error } = useSWR('/api/user', fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        Welcome {data.name}
        <Button />
      </div>
    </div>
  )
}

export default HomePage
