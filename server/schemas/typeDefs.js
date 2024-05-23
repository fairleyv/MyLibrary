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
        book(title: String, ): [Book]
        user(username: String!): User
    }

    type Mutation {
        getSingleUser(username: String!): User
        createUser(username: String!, email:String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        saveBook(_id: String!, bookId: string! ): User
        deleteBook(_id: String!, bookId: string!): User
    }
    `;

    module.exports = typeDefs;