import { use } from 'nexus'
import { prisma } from 'nexus-plugin-prisma'
// import { makeSchema } from 'nexus/components/schema'
// // import path from 'path'

// import { Post, PostQuery } from './Post'
// import { Profile, ProfileQuery } from './Profile'
// import { User, UserQuery } from './User'

use(prisma({ features: { crud: true } }))

// const schema = makeSchema({
//   types: [Post, Profile, User, PostQuery, ProfileQuery, UserQuery],
//   // typegenAutoConfig: {
//   //   contextType: '{ prisma: PrismaClient.PrismaClient }',
//   //   sources: [{ source: '.prisma/client', alias: 'PrismaClient' }],
//   // },
//   // outputs: {
//   //   schema: path.join(process.cwd(), 'schema.graphql'),
//   //   typegen: path.join(process.cwd(), 'node_modules/@types/nexus-typegen/index.d.ts'),
//   // },
//   // prettierConfig: path.join(process.cwd(), 'package.json'),
// })

// // console.log(schema)

// export { schema }
