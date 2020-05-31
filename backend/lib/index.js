"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const uuid_1 = require("uuid");
const { createWriteStream } = require("fs");
const userStore = [];
const fileStore = [];
const typeDefs = apollo_server_1.gql `
  type User {
    id: ID!
    name: String!
    email: String!
    phoneNumber: String!
    address: String!
    zip: String!
    files: [String]!
  }

  type File {
    id: ID!
    filename: String!
  }

  type Query {
    files: [File]
    user(id: String!): User
    users: [User]
  }

  type Mutation {
    addUser(
    name: String!
    email: String!
    phoneNumber: String!
    address: String!
    zip: String!
    files: [String]!): User
    
    uploadFile(file: Upload!): String
  }
`;
const Query = {
    async files() {
        console.log(fileStore);
        return fileStore;
    },
    async user(_, { id }) {
        return userStore.find(e => e.id === id);
    },
    async users() {
        console.log(userStore);
        return userStore;
    }
};
const Mutation = {
    async addUser(_, params) {
        const id = uuid_1.v1();
        userStore.push(Object.assign(Object.assign({}, params), { id }));
        return Object.assign(Object.assign({}, params), { id });
    },
    async uploadFile(parent, { file }) {
        const { createReadStream, filename } = await file;
        const fileName = Date.now() + filename;
        await writeToDisk(createReadStream, fileName);
        const id = uuid_1.v1();
        fileStore.push({ id: id.toString(), filename: fileName });
        return id;
    }
};
const writeToDisk = async (createReadStream, fileName) => {
    return new Promise(async (resolve, reject) => createReadStream()
        .pipe(createWriteStream(__dirname + `/uploads/${fileName}`))
        .on("finish", () => resolve())
        .on("error", (e) => reject(e)));
};
const resolvers = {
    Query,
    Mutation
};
const server = new apollo_server_1.ApolloServer({
    typeDefs,
    resolvers,
    uploads: {
        maxFileSize: 10000000,
        maxFiles: 20,
    },
    introspection: true
});
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
//# sourceMappingURL=index.js.map