import { idArg, makeSchema, objectType, queryType, mutationType, stringArg } from '@nexus/schema'
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
        const user = await ctx.prisma.profile
          .findOne({
            where: { id: root.id },
          })
          .user()
        if (!user) {
          throw new Error(`No user found for id: ${root.id}`)
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
          throw new Error(`No posts found for id: ${root.id}`)
        }
        return posts
      },
    })
    t.field('profile', {
      type: 'Profile',
      nullable: true,
      async resolve(root, _args, ctx) {
        const profile = await ctx.prisma.user
          .findOne({
            where: { id: root.id },
          })
          .profile()
        return profile
      },
    })
  },
})

const Query = queryType({
  definition(t) {
    t.field('post', {
      type: 'Post',
      args: {
        id: idArg(),
      },
      async resolve(_root, args, ctx) {
        const post = await ctx.prisma.post.findOne({
          where: { id: Number(args.id) },
        })
        if (!post) {
          throw new Error(`no post found for id: ${args.id}`)
        }
        return post
      },
    })

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

const Mutation = mutationType({
  definition(t) {
    t.field('creaftDraft', {
      type: 'Post',
      args: {
        title: stringArg({ nullable: false }),
        content: stringArg(),
        authorEmail: stringArg({ nullable: false }),
      },
      resolve(_root, args, ctx) {
        return ctx.prisma.post.create({
          data: {
            title: args.title,
            content: args.content,
            author: {
              connect: { email: args.authorEmail },
            },
          },
        })
      },
    })
  },
})

export const schema = makeSchema({
  types: [Query, Mutation, User, Post, Profile],
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
