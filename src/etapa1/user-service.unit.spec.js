const { createUserService } = require("./userService");

describe("UserService", () => {
  let userRepository;
  let userService;

  // Executa antes de cada teste, preparando um ambiente independente para cada cenário.
  beforeEach(() => {
    // Criamos um objeto que simula o comportamento do repositório.
    // Assim, podemos testar o serviço sem depender de um banco de dados real.
    userRepository = {
      createUser: jest.fn().mockResolvedValue({
        id: 1,
        name: "Gabriel",
      }),
      findById: jest.fn().mockResolvedValue({
        id: 1,
        name: "Gabriel",
      }),
    };

    // Injetamos o repositório simulado no serviço.
    userService = createUserService(userRepository);
  });

  describe("createUser", () => {
    // Testes relacionados à criação de usuários.
    it("should create a user when the name is valid", async () => {
      const result = await userService.createUser("Gabriel");

      // Verifica se o serviço retorna o usuário esperado.
      expect(result).toEqual({
        id: 1,
        name: "Gabriel",
      });

      // Verifica se o repositório foi chamado com o nome informado.
      expect(userRepository.createUser).toHaveBeenCalledWith("Gabriel");
    });

    it("should throw an error when the name is not provided", async () => {
      await expect(userService.createUser()).rejects.toThrow(
        "O nome do usuário é obrigatório",
      );

      // Garante que o repositório não seja chamado para uma entrada inválida.
      expect(userRepository.createUser).not.toHaveBeenCalled();
    });
  });

  describe("findById", () => {
    // Testes relacionados à busca de usuários.
    it("should return a user when found", async () => {
      const result = await userService.findById(1);

      // Verifica se o serviço retorna o usuário esperado.
      expect(result).toEqual({
        id: 1,
        name: "Gabriel",
      });

      // Verifica se a consulta foi realizada com o ID informado.
      expect(userRepository.findById).toHaveBeenCalledWith(1);
    });

    it("should throw an error when the user is not found", async () => {
      // Neste cenário, simulamos uma consulta que não encontrou o usuário.
      userRepository.findById.mockResolvedValue(null);

      await expect(userService.findById(999)).rejects.toThrow(
        "Usuário não encontrado",
      );

      expect(userRepository.findById).toHaveBeenCalledWith(999);
    });
  });
});
