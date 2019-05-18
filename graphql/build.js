/**
 * Called after `npm i` but before now starts the server
 * Used to build graphql schema.
 */

const { writeFileSync, existsSync } = require('fs')
const { fileLoader, mergeTypes } = require('merge-graphql-schemas')
const glob = require('glob').sync

console.log('Building graphql/schema.js from files in graphql/schema/*')

const typeDefs = mergeTypes(fileLoader(`${__dirname}/schema/**/*.graphql`), { all: true })

const resolvers = glob(`${__dirname}/schema/**/*.js`).map(f => f.replace(__dirname, '.'))

const resolverNameFromPath = path => path.replace(/\./g, '').replace(/[ -/]/g, '_')

const hasSchemaDirectives = existsSync(`${__dirname}/schemaDirectives.js`)

const contents = `// this schema was generated on ${(new Date()).toISOString()} with now-build

import { makeExecutableSchema } from 'graphql-tools'
import merge from 'lodash.merge'

${hasSchemaDirectives ? `import schemaDirectives from './schemaDirectives.js'` : ''}
${resolvers.map(r => `import ${resolverNameFromPath(r)} from '${r}'`).join('\n')}

export const typeDefs =  \`
${typeDefs.replace(/`/g, '\\`')}\`
export const resolvers = merge(${resolvers.map(r => resolverNameFromPath(r)).join(', ')})

export default makeExecutableSchema({ typeDefs, resolvers${hasSchemaDirectives ? ', schemaDirectives' : ''} })
`

writeFileSync(`${__dirname}/schema.js`, contents)
