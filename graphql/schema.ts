import * as Prisma from '@prisma/client'
import { on, schema } from 'nexus'

/**
 * Without the Prisma plugin you need to manually expose Prisma types into your backing types.
 */

// todo https://github.com/graphql-nexus/nexus/issues/473#issuecomment-665171477
export type User = Prisma.User
export type Post = Prisma.Post
export type Profile = Prisma.Profile

on.start(() => {
  /**
   * Without the Prisma plugin you need to manaully contruct your Prisma client instance.
   * With the plugin you can also still create your Prisma client instance if you need to.
   */
  const db = new Prisma.PrismaClient()

  /**
   * Without the Prisma plugin you need to manually expose your Prisma client on the context.
   */
  schema.addToContext(() => {
    return { db }
  })
})

const prisma = new Prisma.PrismaClient()

schema.objectType({
  name: 'Post',
  definition(t) {
    t.id('id')
    t.string('title')
    t.string('content', { nullable: true })
    t.string('authorId')
    t.field('author', {
      type: 'User',
      nullable: false,
      async resolve(root, _args, ctx) {
        const author = await ctx.db.user.findOne({
          where: { id: Number(root.authorId) },
        })
        if (!author) {
          throw new Error(`Cannot find author with id: ${root.authorId}`)
        }
        return author
      },
    })
    t.boolean('published')
  },
})

schema.objectType({
  name: 'User',
  definition(t) {
    t.id('id')
    t.string('email')
    t.string('name')
    t.list.field('posts', {
      type: 'Post',
      resolve(root, _args, ctx) {
        return ctx.db.post.findMany({
          where: { authorId: Number(root.id) },
        })
      },
    })
    t.field('profile', {
      type: 'Profile',
      async resolve(root, _args, ctx) {
        const profile = await ctx.db.profile.findOne({
          where: { userId: Number(root.id) },
        })
        if (!profile) {
          throw new Error(`Cannot find profile for id: ${root.id}`)
        }
        return profile
      },
    })
  },
})

schema.objectType({
  name: 'Profile',
  definition(t) {
    t.id('id')
    t.string('bio')
    t.string('userId')
    t.field('user', {
      type: 'User',
      async resolve(root, _args, ctx) {
        const user = await ctx.db.user.findOne({
          where: { id: Number(root.userId) },
        })
        if (!user) {
          throw new Error(`Cannot find user for id: ${root.userId}`)
        }
        return user
      },
    })
  },
})

schema.queryType({
  definition(t) {
    t.list.field('posts', {
      type: 'Post',
      nullable: false,
      resolve(_root, _args, _ctx) {
        return prisma.post.findMany()
      },
    })
  },
})
