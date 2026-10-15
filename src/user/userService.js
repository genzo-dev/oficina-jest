class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async createUser({ name, email }) {
    if (!name || !name.trim()) {
      throw new Error("Name is required");
    }

    return this.userRepository.create({
      name: name.trim(),
      email,
    });
  }

  async findUserById(id) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }
}

module.exports = UserService;
