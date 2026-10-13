const { createProductService } = require("./productService");

describe("ProductService", () => {
  let productRepository;
  let productService;

  beforeEach(() => {
    productRepository = {
      findById: jest.fn().mockResolvedValue({
        id: 1,
        name: "Teclado",
        price: 150,
      }),
    };

    productService = createProductService(productRepository);
  });

  describe("getProductById", () => {
    it("should return a product when found", async () => {
      // Arrange
      const id = 1;

      // Act
      const result = await productService.getProductById(id);

      // Assert
      // TODO: Verifique se o produto retornado é o esperado.

      // TODO: Verifique se o repositório foi chamado com o ID informado.
    });

    it("should throw an error when the ID is not provided", async () => {
      // Arrange
      const id = undefined;

      // Act e Assert
      // TODO: Verifique se a chamada lança o erro esperado.

      // TODO: Verifique se o repositório não foi chamado.
    });

    it("should throw an error when the product is not found", async () => {
      // Arrange
      const id = 999;

      productRepository.findById.mockResolvedValue(null);

      // Act e Assert
      // TODO: Verifique se a chamada lança o erro esperado.

      // TODO: Verifique se o repositório foi chamado com o ID informado.
    });
  });
});
