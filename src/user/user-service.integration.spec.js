const Database = require("better-sqlite3");

const UserRepository = require("./userRepository");
const UserService = require("./userService");

describe("Integration between service, repository and SQLite", () => {
  let database;
  let userRepository;
  let userService;

  beforeEach(() => {
    database = new Database(":memory:");

    database.exec(`
      CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE
      );
    `);

    userRepository = new UserRepository(database);
    userService = new UserService(userRepository);
  });

  afterEach(() => {
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

    const persistedUser = database
      .prepare("SELECT id, name, email FROM users WHERE id = ?")
      .get(createdUser.id);

    expect(persistedUser).toEqual(createdUser);
  });

  it("should return an existing user", async () => {
    const result = database
      .prepare("INSERT INTO users (name, email) VALUES (?, ?)")
      .run("Maria", "maria@example.com");

    const userId = Number(result.lastInsertRowid);

    const user = await userService.findUserById(userId);

    expect(user).toEqual({
      id: userId,
      name: "Maria",
      email: "maria@example.com",
    });
  });

  it("should throw when the user does not exist", async () => {
    await expect(userService.findUserById(-1)).rejects.toThrow(
      "User not found",
    );
  });
});
