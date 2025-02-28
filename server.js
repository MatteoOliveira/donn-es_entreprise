const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { gql } = require('graphql-tag');
const jwt = require('jsonwebtoken');

const typeDefs = gql`
    type AuthPayload {
        token: String
    }

    type Query {
        hello: String
    }

    type Mutation {
        login(username: String!): AuthPayload
    }
`;

const resolvers = {
    Query: {
        hello: () => "Bienvenue sur mon API GraphQL !"
    },
    Mutation: {
        login: (_, { username }) => {
            const token = jwt.sign({ username }, "SECRET_KEY", { expiresIn: "1h" });
            return { token };
        }
    }
};

// Démarrer le serveur
async function startServer() {
    const server = new ApolloServer({ typeDefs, resolvers });
    const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });
    console.log(`🚀 Serveur GraphQL lancé sur ${url}`);
}

startServer();
