// Importamos nosso banco de dados (sqlite3) como Database
const Database = require("better-sqlite3");

const UserRepository = require("./userRepository");
const UserService = require("./userService");

describe("Integration between service, repository and SQLite", () => {
  // Criamos variáveis que utilizaremos posteriormente
  let database;
  let userRepository;
  let userService;

  beforeEach(() => {
    // Cria um banco de dados isolado em memória para cada teste
    database = new Database(":memory:");

    // Prepara a estrutura do bando de dados requisistada pelos testes
    database.exec(`
      CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE
      );
    `);

    // Utiliza o repositório e o serviço reais
    userRepository = new UserRepository(database);
    userService = new UserService(userRepository);
  });

  afterEach(() => {
    // Fecha a conexão com o banco de dados após cada teste
    database.close();
  });

  it("should create and persist a user", async () => {
    const userData = {
      name: "Gabriel",
      email: "gabriel@example.com",
    };

    const createdUser = await userService.createUser(userData);

    expect(createdUser).toEqual({
      id: expect.any(Number),
      name: userData.name,
      email: userData.email,
    });

    // Verifica se o usuário foi persistido no banco, sem confiar somente na resposta do serviço
    const persistedUser = database
      .prepare("SELECT id, name, email FROM users WHERE id = ?")
      .get(createdUser.id);

    expect(persistedUser).toEqual(createdUser);
  });

  it("should return an existing user", async () => {
    // Insere um registro diretamente no banco de dados real
    const result = database
      .prepare("INSERT INTO users (name, email) VALUES (?, ?)")
      .run("Maria", "maria@example.com");

    const userId = Number(result.lastInsertRowid);

    // Recupera o registro de acordo com o serviço e o repositório
    const user = await userService.findUserById(userId);

    expect(user).toEqual({
      id: userId,
      name: "Maria",
      email: "maria@example.com",
    });
  });

  it("should throw when the user does not exist", async () => {
    await expect(userService.findUserById(-1)).rejects.toThrow(
      "Usuário não encontrado",
    );
  });
});
