import typeDefs from '@/main/graphql/type-defs'
import resolvers from '@/main/graphql/resolvers'

import { ApolloServer } from 'apollo-server-express'
import { makeExecutableSchema } from '@graphql-tools/schema'

const schema = makeExecutableSchema({ resolvers, typeDefs })

export const setupApolloServer = (): ApolloServer => new ApolloServer({
  schema
})
