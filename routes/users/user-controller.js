const User = require("./user-model");

const getAllUsers = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        throw error
    }
}

const getUserById = async (id) => {
    try {
        const findUser = await User.findById(id);
        return findUser
    } catch (error) {
        throw error
    }
}

const createUser = async (userData) => {
  try {
    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    throw error
  }
};

module.exports = { createUser, getAllUsers, getUserById }