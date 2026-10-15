const ProductService = require("./productService");

describe("ProductService unit tests", () => {
  let productRepository;
  let productService;

  beforeEach(() => {
    // Cria um repositório simulado para isolar os testes do banco de dados.
    productRepository = {
      create: jest.fn(),
      findById: jest.fn(),
    };

    productService = new ProductService(productRepository);
  });

  describe("createProduct", () => {
    it("should create a product with a trimmed name", async () => {
      const productData = {
        name: " Mechanical Keyboard ",
        price: 249.9,
      };

      const expectedProduct = {
        id: 1,
        name: "Mechanical Keyboard",
        price: 249.9,
      };

      productRepository.create.mockReturnValue(expectedProduct);

      const result = await productService.createProduct(productData);

      expect(productRepository.create).toHaveBeenCalledWith({
        name: "Mechanical Keyboard",
        price: 249.9,
      });

      expect(result).toEqual(expectedProduct);
    });

    it("should throw when the name is missing", async () => {
      await expect(
        productService.createProduct({
          name: "",
          price: 249.9,
        }),
      ).rejects.toThrow("Product name is required");

      expect(productRepository.create).not.toHaveBeenCalled();
    });

    it("should throw when the name contains only whitespace", async () => {
      await expect(
        productService.createProduct({
          name: "   ",
          price: 249.9,
        }),
      ).rejects.toThrow("Product name is required");

      expect(productRepository.create).not.toHaveBeenCalled();
    });

    it("should throw when the price is zero", async () => {
      await expect(
        productService.createProduct({
          name: "Mechanical Keyboard",
          price: 0,
        }),
      ).rejects.toThrow("Product price must be greater than zero");

      expect(productRepository.create).not.toHaveBeenCalled();
    });

    it("should throw when the price is negative", async () => {
      await expect(
        productService.createProduct({
          name: "Mechanical Keyboard",
          price: -10,
        }),
      ).rejects.toThrow("Product price must be greater than zero");

      expect(productRepository.create).not.toHaveBeenCalled();
    });

    it("should throw when the price is not a number", async () => {
      await expect(
        productService.createProduct({
          name: "Mechanical Keyboard",
          price: "249.9",
        }),
      ).rejects.toThrow("Product price must be greater than zero");

      expect(productRepository.create).not.toHaveBeenCalled();
    });
  });

  describe("findProductById", () => {
    it("should return an existing product", async () => {
      const expectedProduct = {
        id: 1,
        name: "Mechanical Keyboard",
        price: 249.9,
      };

      productRepository.findById.mockResolvedValue(expectedProduct);

      const result = await productService.findProductById(1);

      expect(productRepository.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(expectedProduct);
    });

    it("should throw when the product ID is undefined", async () => {
      await expect(productService.findProductById(undefined)).rejects.toThrow(
        "Product ID is required",
      );

      expect(productRepository.findById).not.toHaveBeenCalled();
    });

    it("should throw when the product ID is null", async () => {
      await expect(productService.findProductById(null)).rejects.toThrow(
        "Product ID is required",
      );

      expect(productRepository.findById).not.toHaveBeenCalled();
    });

    it("should throw when the product does not exist", async () => {
      productRepository.findById.mockResolvedValue(null);

      await expect(productService.findProductById(999)).rejects.toThrow(
        "Product not found",
      );

      expect(productRepository.findById).toHaveBeenCalledWith(999);
    });
  });
});
