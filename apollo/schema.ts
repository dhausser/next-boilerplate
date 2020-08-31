import { makeSchema, objectType, queryType } from '@nexus/schema'
import path from 'path'

const Post = objectType({
  name: 'Post',
  definition(t) {
    t.id('id')
    t.string('title')
    t.string('content', { nullable: true })
    t.boolean('published')
    t.string('createdAt')
    t.string('authorId')
    t.field('author', {
      type: 'User',
      async resolve(root, _args, ctx) {
        const author = await ctx.prisma.post
          .findOne({
            where: { id: root.id },
          })
          .author()
        if (!author) {
          throw new Error('no post found')
        }
        return author
      },
    })
  },
})

const Profile = objectType({
  name: 'Profile',
  definition(t) {
    t.id('id')
    t.string('bio', { nullable: true })
    t.string('userId')
    t.field('user', {
      type: 'User',
      async resolve(root, _args, ctx) {
        const user = await ctx.prisma.profile.findOne({
          where: { id: root.id },
        })
        if (!user) {
          throw new Error('no user found')
        }
        return user
      },
    })
  },
})

const User = objectType({
  name: 'User',
  definition(t) {
    t.id('id')
    t.string('email')
    t.string('name', { nullable: true })
    t.list.field('posts', {
      type: 'Post',
      async resolve(root, _args, ctx) {
        const posts = await ctx.prisma.user
          .findOne({
            where: { id: root.id },
          })
          .posts()
        if (!posts) {
          throw new Error('no posts found')
        }
        return posts
      },
    })
    t.field('profile', {
      type: 'Profile',
      nullable: true,
      async resolve(root, _args, ctx) {
        const profile = await ctx.prisma.user.findOne({
          where: { id: root.id },
        })
        if (!profile) {
          throw new Error('no profile found')
        }
        return profile
      },
    })
  },
})

const Query = queryType({
  definition(t) {
    t.list.field('posts', {
      type: 'Post',
      resolve(_root, _args, ctx) {
        return ctx.prisma.post.findMany()
      },
    })
    t.list.field('profile', {
      type: 'Profile',
      resolve(_root, _args, ctx) {
        return ctx.prisma.profile.findMany()
      },
    })
    t.list.field('users', {
      type: 'User',
      resolve(_root, _args, ctx) {
        return ctx.prisma.user.findMany()
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
