import { schema } from 'nexus'

schema.objectType({
  name: 'Profile',
  definition(t) {
    t.model.id()
    t.model.bio()
    t.model.user()
    t.model.userId()
  },
})

schema.extendType({
  type: 'Query',
  definition(t) {
    t.crud.profile()
    t.crud.profiles()
  },
})
