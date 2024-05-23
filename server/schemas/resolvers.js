const {Book, User } = require('../models');
const {signToken, AuthenticationError} = require ('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.findOne({username}).populate('savedBooks');
        },
        
    }
}