import { makeSchema, objectType, queryType } from 'nexus/components/schema'
import path from 'path'

export const Post = objectType({
  name: 'Post',
  definition(t) {
    t.id('id')
    // t.model.title()
    // t.model.content()
    // t.model.author()
    // t.model.authorId()
    // t.model.published()
    // t.model.createdAt()
  },
})

// const Profile = objectType({
//   name: 'Profile',
//   definition(t) {
//     t.model.id()
//     t.model.bio()
//     t.model.user()
//     t.model.userId()
//   },
// })

// const User = objectType({
//   name: 'User',
//   definition(t) {
//     t.model.id()
//     t.model.email()
//     t.model.name()
//     t.model.posts()
//     t.model.profile()
//   },
// })

const Query = queryType({
  definition(t) {
    t.list.field('Post', {
      type: 'Post',
      resolve() {
        return []
      },
    })
    // t.crud.post()
    // t.crud.posts()
    // t.crud.profile()
    // t.crud.profiles()
    // t.crud.user()
    // t.crud.users()
  },
})

export const nexusSchema = makeSchema({
  types: [Post, Query],
  outputs: {
    schema: path.join(process.cwd(), 'schema.graphql'),
  },
})
