const Database = require("better-sqlite3");

const ProductRepository = require("./productRepository");
const ProductService = require("./productService");

describe("Integration between service, repository and SQLite", () => {
  let database;
  let productRepository;
  let productService;

  beforeEach(() => {
    database = new Database(":memory:");

    database.exec(`
      CREATE TABLE products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price REAL NOT NULL
      );
    `);

    productRepository = new ProductRepository(database);
    productService = new ProductService(productRepository);
  });

  afterEach(() => {
    database.close();
  });

  it("should create and persist a product", async () => {
    const productData = {
      name: "Mechanical Keyboard",
      price: 249.9,
    };

    const createdProduct = await productService.createProduct(productData);

    expect(createdProduct).toEqual({
      id: expect.any(Number),
      name: productData.name,
      price: productData.price,
    });

    const persistedProduct = database
      .prepare("SELECT id, name, price FROM products WHERE id = ?")
      .get(createdProduct.id);

    expect(persistedProduct).toEqual(createdProduct);
  });

  it("should return an existing product", async () => {
    const result = database
      .prepare("INSERT INTO products (name, price) VALUES (?, ?)")
      .run("Wireless Mouse", 89.9);

    const productId = Number(result.lastInsertRowid);

    const product = await productService.findProductById(productId);

    expect(product).toEqual({
      id: productId,
      name: "Wireless Mouse",
      price: 89.9,
    });
  });

  it("should throw when the product does not exist", async () => {
    await expect(productService.findProductById(-1)).rejects.toThrow(
      "Product not found",
    );
  });

  it("should reject a product with an invalid price", async () => {
    const productData = {
      name: "Invalid Product",
      price: 0,
    };

    await expect(productService.createProduct(productData)).rejects.toThrow(
      "Product price must be greater than zero",
    );
  });
});
