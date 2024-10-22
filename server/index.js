import express from "express";
import cors from "cors";
import graphql, {
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import { graphqlHTTP } from "express-graphql";
import userData from "./mockd.json" assert { type: "json" };

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: () => ({
    id: { type: GraphQLInt },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllUsers: {
      type: new GraphQLList(UserType),
      resolve: (parent, args) => {
        return userData;
      },
    },
    getUserById: {
      type: UserType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (parent, args) => {
        return userData.find((user) => user.id === args.id);
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: UserType,
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve: (parent, args) => {
        const newUser = {
          id: userData.length + 1,
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
          password: args.password,
        };
        userData.push(newUser);
        return newUser;
      },
    },
  },
});

const app = express();
const PORT = 8080;

app.use(cors());

const schema = new graphql.GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

// graphql server
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

// express server
app.listen(PORT, () => {
  console.log(`server started in port ${PORT}`);
});
