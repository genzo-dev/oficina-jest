// Importamos nosso banco de dados (SQLite) como Database
const Database = require("better-sqlite3");

const ProductRepository = require("./productRepository");
const ProductService = require("./productService");

describe("Integration between service, repository and SQLite", () => {
  // Criamos variáveis que utilizaremos posteriormente
  let database;
  let productRepository;
  let productService;

  beforeEach(() => {
    // Cria um banco de dados isolado em memória para cada teste
    database = new Database(":memory:");

    // Prepara a estrutura do banco de dados necessária para os testes
    database.exec(`
      CREATE TABLE products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price REAL NOT NULL
      );
    `);

    // Utiliza o repositório e o serviço reais
    productRepository = new ProductRepository(database);
    productService = new ProductService(productRepository);
  });

  afterEach(() => {
    // Fecha a conexão com o banco de dados após cada teste
    database.close();
  });

  it("should create and persist a product", async () => {
    const productData = {
      name: "Teclado mecânico",
      price: 249.9,
    };

    // TODO 1: Utilize o serviço para cadastrar o produto.
    // Dica: armazene o resultado de createProduct() em uma variável.

    // TODO 2: Verifique se o produto retornado possui os dados esperados.
    // Dica: utilize toEqual() e expect.any(Number) para verificar o ID.

    // TODO 3: Consulte diretamente o banco para verificar a persistência.
    // Dica: utilize prepare() e get() para buscar o produto pelo ID.

    // TODO 4: Compare o registro persistido com o produto cadastrado.
    // O objetivo é garantir que os dados realmente foram salvos no banco.
  });

  it("should return an existing product", async () => {
    // Insere um produto diretamente no banco de dados real
    const result = database
      .prepare("INSERT INTO products (name, price) VALUES (?, ?)")
      .run("Mouse sem fio", 89.9);

    const productId = Number(result.lastInsertRowid);

    // TODO 5: Utilize o serviço para consultar o produto pelo ID.
    // Dica: armazene o resultado de findProductById() em uma variável.

    // TODO 6: Verifique se o produto retornado possui os dados esperados.
    // Considere o ID gerado pelo banco, o nome e o preço.
  });

  it("should throw when the product does not exist", async () => {
    // TODO 7: Tente consultar um produto inexistente pelo serviço.
    // Dica: utilize um ID que não corresponda a nenhum registro.
    // TODO 8: Verifique se a Promise é rejeitada com a mensagem esperada.
    // Dica: consulte o uso de rejects.toThrow() na etapa anterior.
  });

  it("should reject a product with an invalid price", async () => {
    const productData = {
      name: "Invalid Product",
      price: 0,
    };

    // TODO 9: Tente cadastrar o produto com preço inválido.
    // TODO 10: Verifique se a operação é rejeitada com a mensagem esperada.
  });
});
