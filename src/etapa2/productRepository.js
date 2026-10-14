class ProductRepository {
  constructor(database) {
    this.database = database;
  }

  create({ name, price }) {
    const statement = this.database.prepare(`
      INSERT INTO products (name, price)
      VALUES (?, ?)
    `);

    const result = statement.run(name, price);

    return {
      id: Number(result.lastInsertRowid),
      name,
      price,
    };
  }

  findById(id) {
    const statement = this.database.prepare(`
      SELECT id, name, price
      FROM products
      WHERE id = ?
    `);

    return statement.get(id) ?? null;
  }
}

module.exports = ProductRepository;
