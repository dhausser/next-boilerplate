/* eslint-disable no-console */
import { use } from 'nexus'
import { makeSchema } from 'nexus/components/schema'
import { prisma } from 'nexus-plugin-prisma'
import path from 'path'

// TODO: Get the GraphQL schema from nexus

// import { Post } from './Post'
// import { Profile } from './Profile'
// import { User } from './User'

use(prisma({ features: { crud: true } }))

const schema = makeSchema({
  // types: [User, Profile, Post],
  types: [],
  outputs: {
    schema: path.join(process.cwd(), 'schema.graphql'),
  },
})

console.log(schema)

export { schema }
