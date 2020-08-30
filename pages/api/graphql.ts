if (process.env.NODE_ENV === 'development') require('nexus').default.reset()

const app = require('nexus').default
const { prisma } = require('nexus-plugin-prisma')

require('../../graphql/User')
require('../../graphql/Profile')
require('../../graphql/Post')

app.use(prisma({ features: { crud: true } }))
app.assemble()

export default app.server.handlers.graphql
