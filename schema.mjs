import { buildSchema } from 'graphql';

const schema = buildSchema(`
  type Query {
    hello(name: String!): Int
    getSkills: [Skill]
    getAuthors: [Author]
    getPosts: [Post]
  }

  type Mutation {
    createAuthor(input: AuthorInput): Author!
    createPost(title: String!, content: String!): String!
    createSkill(title: String!, buzzWords: [String]!): Skill!
  }
  
  input AuthorInput {
    name: String,
    age: Int
    skills: [String]
  }

  type Skill {
    id: String!
    title: String!
    buzzWords: [String]!
  }

  type Author {
    id: String!
    name: String
    age: Int
    skills: [Skill]
  }

  type Post {
   id: String!
   title: String!
   content: String!
   author: Author
 }
`);

export default schema;
