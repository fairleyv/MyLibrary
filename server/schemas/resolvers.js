const { User } = require('../models');
const {signToken, AuthenticationError} = require ('../utils/auth');

const resolvers = {
    Query: {
        user: async (parent, {username}) => {
            const user = await User.findOne({ $or: [{username}, {_id: username}]}).populate('savedBooks');
            return user;
        }, 
        searchBooks: async (_, { query }) => {
            const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
            return response.data.items.map(book => ({
                id: book.id,
                title: book.volumeInfo.title,
                authors: book.volumeInfo.authors || ['No author to display'],
                description: book.volumeInfo.description,
                image: book.volumeInfo.imageLinks?.thumbnail || '',
            }));
        },
    },
    Mutation: {
        createUser: async (parent, {username, email, password }) => {
            const user = await User.create({username, email, password});
            const token = signToken(user);
            return {token, user};
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({email});

            if (!user) {
                throw new AuthenticationError(`Some of your information is incorrect`);
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError(`Some of your information is incorrect`);
            }

            const token = signToken(user);

            return { token, user };
        },
        saveBook: async (parent, {username, bookId}, context) => {
            if (context.user) {
               const updatedUser = await User.findOneAndUpdate(
                    {$or: [{username}, {_id:context.user._id}]},
                    {$addToSet: {savedBooks: bookId}}
                );
                return updatedUser;
            } 
            throw new AuthenticationError(`You must be logged in`);
        },
        deleteBook: async (parent, {username, bookId}, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                   {$or: [{username}, {_id:context.user._id}]},
                   {$pull: {savedBooks: bookId}},
                   {new: true}
               );
               return updatedUser;
            }
            throw new AuthenticationError(`You must be logged in`);
        },
    },
};

module.exports = resolvers;