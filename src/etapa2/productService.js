class ProductService {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async createProduct({ name, price }) {
    if (!name || !name.trim()) {
      throw new Error("O nome do produto é obrigatório");
    }

    if (typeof price !== "number" || price <= 0) {
      throw new Error("O preço do produto precisa ser maior do que zero");
    }

    return this.productRepository.create({
      name: name.trim(),
      price,
    });
  }

  async findProductById(id) {
    const product = this.productRepository.findById(id);

    if (!product) {
      throw new Error("Produto não encontrado");
    }

    return product;
  }
}

module.exports = ProductService;
