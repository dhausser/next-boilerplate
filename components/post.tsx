import { useQuery, gql } from '@apollo/client'
import * as PostTypes from './__generated__/Post'

interface Props {
  id: number
}

export const POST_QUERY = gql`
  query Post($input: PostWhereUniqueInput!) {
    post(where: $input) {
      id
      title
      content
      author {
        name
        email
      }
      published
      createdAt
    }
  }
`

function Post(props: Props) {
  const { loading, error, data } = useQuery<PostTypes.Post, PostTypes.PostVariables>(POST_QUERY, {
    variables: { input: { id: props.id } },
  })

  if (loading || !data) return <p>Loading...</p>
  if (error) return <p>{error.message}</p>

  return (
    <>
      <p>ID: {data.post?.id}</p>
      <p>Title: {data.post?.title}</p>
      <p>Content: {data.post?.content}</p>
      <p>Author: {data.post?.author.name}</p>
      <p>{`Published: ${data.post?.published}`}</p>
      <p>Created at: {data.post?.createdAt}</p>
    </>
  )
}

export { Post }
