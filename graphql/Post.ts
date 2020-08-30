import { schema } from 'nexus'

schema.objectType({
  name: 'Post',
  definition(t) {
    t.model.id()
    t.model.title()
    t.model.content()
    t.model.author()
    t.model.authorId()
    t.model.published()
    t.model.createdAt()
  },
})

schema.extendType({
  type: 'Query',
  definition(t) {
    t.crud.post()
    t.crud.posts()
  },
})
