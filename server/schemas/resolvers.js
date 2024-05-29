const { User } = require('../models');
const {signToken, AuthenticationError} = require ('../utils/auth');

const resolvers = {
    Query: {
        user: async (parent, {username}) => {
                return User.findOne({ $or: [{username}, {_id: username}]}).populate('savedBooks');
  
    },
    Mutation: {
        createUser: async (parent, {username, email, password }) => {
            const user = await User.create({username, email, password});
            token = signToken(user);
            {token, user};
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({email});

            if (!user) {
                throw AuthenticationError;
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw AuthenticationError;
            }

            const token = signToken(user);

            return { token, user };
        },
        saveBook: async (parent, {username}, context) => {
            if (context.user) {
               return User.findOneAndUpdate(
                    {$or: [{username}, {_id:username}]},
                    {$addToSet: {savedBooks: bookId}}
                );
            } 
            throw AuthenticationError;
        },
        deleteBook: async (parent, {username}, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                   {$or: [{username}, {_id:username}]},
                   {$pull: {savedBooks: bookId}},
                   {new: true}
               );
            }
            throw AuthenticationError;
        },
    },
};

module.exports = resolvers;