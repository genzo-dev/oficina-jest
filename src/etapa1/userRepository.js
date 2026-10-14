class UserRepository {
  constructor(database) {
    this.database = database;
  }

  create({ name, email }) {
    const statement = this.database.prepare(`
      INSERT INTO users (name, email)
      VALUES (?, ?)
    `);

    const result = statement.run(name, email);

    return {
      id: Number(result.lastInsertRowid),
      name,
      email,
    };
  }

  findById(id) {
    const statement = this.database.prepare(`
      SELECT id, name, email
      FROM users
      WHERE id = ?
    `);

    return statement.get(id) ?? null;
  }
}

module.exports = UserRepository;
