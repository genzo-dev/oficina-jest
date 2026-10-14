class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async createUser({ name, email }) {
    if (!name || !name.trim()) {
      throw new Error("O nome do usuário é obrigatório");
    }

    return this.userRepository.create({
      name: name.trim(),
      email,
    });
  }

  async findUserById(id) {
    const user = this.userRepository.findById(id);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return user;
  }
}

module.exports = UserService;
