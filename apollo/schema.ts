import { makeSchema } from 'nexus/components/schema'
import path from 'path'

export const schema = makeSchema({
  types: [],
  outputs: {
    schema: path.join(process.cwd(), 'schema.graphql'),
  },
})
