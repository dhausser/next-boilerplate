module.exports = {
  client: {
    includes: ['./components/**/*.tsx'], // array of glob patterns
    service: {
      localSchemaFile: 'api.graphql',
    },
  },
}
