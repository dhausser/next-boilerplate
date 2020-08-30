import { schema } from 'nexus'

export const Post = schema.objectType({
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

export const Query = schema.extendType({
  type: 'Query',
  definition(t) {
    t.crud.post()
    t.crud.posts()
  },
})
