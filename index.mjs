import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import db, { createAsset, getAssetsByType } from './db.mjs';
import schema from './schema.mjs';

// The root provides a resolver function for each API endpoint
var root = {
  hello: ({ name }) => {
    return `Hello ${name} 👋👋👋, welcome to GraphQL 101 🚀🚀🚀`
  },
  getSkills: async () => getAssetsByType('skills'),
  getAuthors: async () => getAssetsByType('authors', { skills: 'skills' }),
  getPosts: async () => getAssetsByType('posts'),
  createAuthor: async ({ input }) => await createAsset(input, 'authors'),
  createSkill: async (input) => await createAsset(input, 'skills'),
  createPost: ({ title, content }) => {
    console.log(title, content);

    return "ABC";
  }
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
