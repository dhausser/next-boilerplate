import { makeSchema, objectType, queryType } from '@nexus/schema'
import path from 'path'

const Post = objectType({
  name: 'Post',
  definition(t) {
    t.id('id')
    t.string('title')
    t.string('content')
    t.boolean('published')
    // t.model.id()
    // t.model.title()
    // t.model.content()
    // t.model.author()
    // t.model.authorId()
    // t.model.published()
    // t.model.createdAt()
  },
})

const Profile = objectType({
  name: 'Profile',
  definition(t) {
    t.id('id')
    t.string('bio')
    // t.model.id()
    // t.model.bio()
    // t.model.user()
    // t.model.userId()
  },
})

const User = objectType({
  name: 'User',
  definition(t) {
    t.id('id')
    t.string('email')
    t.string('name')
    // t.model.id()
    // t.model.email()
    // t.model.name()
    // t.model.posts()
    // t.model.profile()
  },
})

const Query = queryType({
  definition(t) {
    t.list.field('posts', {
      type: 'Post',
      resolve() {
        return []
      },
    })
    t.list.field('profile', {
      type: 'Profile',
      resolve() {
        return []
      },
    })
    t.list.field('users', {
      type: 'User',
      resolve() {
        return []
      },
    })
  },
})

export const schema = makeSchema({
  types: [Query, User, Post, Profile],
  typegenAutoConfig: {
    contextType: '{ prisma: PrismaClient.PrismaClient }',
    sources: [{ source: '.prisma/client', alias: 'PrismaClient' }],
  },
  outputs: {
    schema: path.join(process.cwd(), 'schema.graphql'),
    typegen: path.join(process.cwd(), 'node_modules/@types/nexus-typegen/index.d.ts'),
  },
  prettierConfig: path.join(process.cwd(), 'package.json'),
})
