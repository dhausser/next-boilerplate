import { schema } from 'nexus'

export const User = schema.objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.email()
    t.model.name()
    t.model.posts()
    t.model.profile()
  },
})

schema.extendType({
  type: 'Query',
  definition(t) {
    t.crud.user()
    t.crud.users()
  },
})
