function createUserService(userRepository) {
  async function createUser(name) {
    if (!name) {
      throw new Error("O nome do usuário é obrigatório");
    }

    return userRepository.createUser(name);
  }

  async function findById(id) {
    const user = await userRepository.findById(id);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return user;
  }

  return {
    createUser,
    findById,
  };
}

module.exports = { createUserService };
