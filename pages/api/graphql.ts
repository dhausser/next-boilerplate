if (process.env.NODE_ENV === 'development') require('nexus').default.reset()

const app = require('nexus').default

require('../../graphql/schema')
require('../../graphql/User')
require('../../graphql/Profile')
require('../../graphql/Post')

app.assemble()

export default app.server.handlers.graphql
