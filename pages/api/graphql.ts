import { ApolloServer } from 'apollo-server-micro'
import { schema } from '../../apollo/schema'
import { createContext } from '../../apollo/context'

const apolloServer = new ApolloServer({
  schema,
  context: createContext(),
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default apolloServer.createHandler({ path: '/api/graphql' })
