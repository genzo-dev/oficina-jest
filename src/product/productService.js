class ProductService {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async createProduct({ name, price }) {
    if (!name || !name.trim()) {
      throw new Error("Product name is required");
    }

    if (typeof price !== "number" || price <= 0) {
      throw new Error("Product price must be greater than zero");
    }

    return this.productRepository.create({
      name: name.trim(),
      price,
    });
  }

  async findProductById(id) {
    if (id === undefined || id === null) {
      throw new Error("Product ID is required");
    }

    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  }
}

module.exports = ProductService;
