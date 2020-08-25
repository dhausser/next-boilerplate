import { schema, use } from 'nexus'
import { prisma } from 'nexus-plugin-prisma'

use(prisma({ features: { crud: true } }))

schema.objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.email()
    t.model.name()
  },
})

schema.queryType({
  definition(t) {
    t.crud.users()
  },
})
