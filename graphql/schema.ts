/* eslint-disable no-console */
import { use, schema as nexusSchema } from 'nexus'
import { makeSchema } from 'nexus/components/schema'
import { prisma } from 'nexus-plugin-prisma'
import path from 'path'

use(prisma({ features: { crud: true } }))

const Query = nexusSchema.queryType

const schema = makeSchema({
  types: { Query },
  outputs: {
    schema: path.join(process.cwd(), 'schema.graphql'),
  },
})

console.log(schema)

export { schema }
