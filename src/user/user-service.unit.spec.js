const UserService = require("./userService");

describe("UserService unit tests", () => {
  let userRepository;
  let userService;

  beforeEach(() => {
    // Cria um repositório simulado para isolar os testes do banco de dados.
    userRepository = {
      create: jest.fn(),
      findById: jest.fn(),
    };

    userService = new UserService(userRepository);
  });

  describe("createUser", () => {
    it("should create a user with a trimmed name", async () => {
      const userData = {
        name: " Gabriel ",
        email: "gabriel@example.com",
      };

      const expectedUser = {
        id: 1,
        name: "Gabriel",
        email: "gabriel@example.com",
      };

      userRepository.create.mockReturnValue(expectedUser);

      const result = await userService.createUser(userData);

      expect(userRepository.create).toHaveBeenCalledWith({
        name: "Gabriel",
        email: "gabriel@example.com",
      });

      expect(result).toEqual(expectedUser);
    });

    it("should throw when the name is missing", async () => {
      await expect(
        userService.createUser({
          name: "",
          email: "gabriel@example.com",
        }),
      ).rejects.toThrow("Name is required");

      expect(userRepository.create).not.toHaveBeenCalled();
    });

    it("should throw when the name contains only whitespace", async () => {
      await expect(
        userService.createUser({
          name: "   ",
          email: "gabriel@example.com",
        }),
      ).rejects.toThrow("Name is required");

      expect(userRepository.create).not.toHaveBeenCalled();
    });
  });

  describe("findUserById", () => {
    it("should return an existing user", async () => {
      const expectedUser = {
        id: 1,
        name: "Gabriel",
        email: "gabriel@example.com",
      };

      userRepository.findById.mockResolvedValue(expectedUser);

      const result = await userService.findUserById(1);

      expect(userRepository.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(expectedUser);
    });

    it("should throw when the user does not exist", async () => {
      userRepository.findById.mockResolvedValue(null);

      await expect(userService.findUserById(999)).rejects.toThrow(
        "User not found",
      );

      expect(userRepository.findById).toHaveBeenCalledWith(999);
    });
  });
});
