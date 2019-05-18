import express from 'express'
import { ApolloServer } from 'apollo-server-express'

import schema from './schema'

const server = new ApolloServer({ schema })

const app = express()
server.applyMiddleware({ app })

export default app
