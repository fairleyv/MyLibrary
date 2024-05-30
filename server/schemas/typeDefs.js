const typeDefs = `
    type Book {
        _id: ID!
        authors: [String]
        description: String
        bookId: String
        image: String
        link: String
        title: String
    }

    type User {
        username: String
        email: String
        password: String
        savedBooks: [Book]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        user(username: String!): User
    }

    type Mutation {
        createUser(username: String!, email:String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        saveBook(username: String, bookId: String! ): User
        deleteBook(username: String, bookId: String!): User
    }
    `;

module.exports = typeDefs;